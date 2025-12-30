import type { editor } from 'monaco-editor';
import type { Monaco } from '@issadicko/kodi-editor-language';

export interface DiagnosticError {
    line: number;
    column: number;
    message: string;
    severity: 'error' | 'warning' | 'info';
}

/**
 * Validates KodiScript code and returns diagnostics.
 * Uses the @issadicko/kodi-script parser for syntactic validation
 * and custom analysis for semantic validation.
 */
export class DiagnosticsService {
    private monaco: Monaco;
    private owner = 'kodiscript';
    private kodiScript: typeof import('@issadicko/kodi-script') | null = null;

    constructor(monaco: Monaco) {
        this.monaco = monaco;
    }

    /**
     * Lazily load the kodi-script SDK.
     */
    private async getKodiScript() {
        if (!this.kodiScript) {
            this.kodiScript = await import('@issadicko/kodi-script');
        }
        return this.kodiScript;
    }

    /**
     * Validates the given code and sets markers on the model.
     */
    async validate(model: editor.ITextModel): Promise<DiagnosticError[]> {
        const code = model.getValue();
        const errors: DiagnosticError[] = [];

        try {
            const kodi = await this.getKodiScript();

            // Try to parse the code (syntax validation only, no execution)
            try {
                // Use Lexer and Parser for syntax checking
                // Note: run() executes the code which causes false positives for valid syntax
                const tokens = new kodi.Lexer(code).tokenize();
                new kodi.Parser(tokens).parse();
            } catch (err) {
                const error = this.parseError(err);
                if (error) {
                    errors.push(error);
                }
            }

            // Semantic validation: check for undefined variables
            const semanticErrors = this.validateSemantics(code);
            errors.push(...semanticErrors);
        } catch (err) {
            // If module loading fails, skip validation
            console.warn('KodiScript module not available for validation:', err);
        }

        // Convert errors to Monaco markers
        const markers: editor.IMarkerData[] = errors.map(e => ({
            severity: this.monaco.MarkerSeverity[this.severityToMarker(e.severity)],
            startLineNumber: e.line,
            startColumn: e.column,
            endLineNumber: e.line,
            endColumn: e.column + 10, // Approximate end
            message: e.message,
            source: 'KodiScript',
        }));

        this.monaco.editor.setModelMarkers(model, this.owner, markers);
        return errors;
    }

    /**
     * Parse error message to extract line and column information.
     */
    private parseError(err: unknown): DiagnosticError | null {
        if (!(err instanceof Error)) return null;

        const message = err.message;

        // Match patterns like "at line X, column Y" or "line X:Y"
        const lineColMatch = message.match(/(?:at\s+)?line\s+(\d+)(?:,?\s*column\s+|\s*:\s*)(\d+)/i);
        if (lineColMatch) {
            return {
                line: parseInt(lineColMatch[1], 10),
                column: parseInt(lineColMatch[2], 10),
                message: message.replace(lineColMatch[0], '').trim() || message,
                severity: 'error',
            };
        }

        // Fallback: line only
        const lineMatch = message.match(/line\s+(\d+)/i);
        if (lineMatch) {
            return {
                line: parseInt(lineMatch[1], 10),
                column: 1,
                message,
                severity: 'error',
            };
        }

        // Fallback: report at line 1
        return {
            line: 1,
            column: 1,
            message,
            severity: 'error',
        };
    }

    /**
     * Performs semantic validation (variable usage, etc.)
     */
    private validateSemantics(code: string): DiagnosticError[] {
        const errors: DiagnosticError[] = [];
        const lines = code.split('\n');
        const declaredVars = new Set<string>();

        // First pass: collect variable declarations
        for (const line of lines) {
            // Match let declarations: let x = ...
            const letMatch = line.match(/\blet\s+([a-zA-Z_]\w*)\s*=/);
            if (letMatch) {
                declaredVars.add(letMatch[1]);
            }

            // Match function parameters: fn (param1, param2) or fn(x)
            // This handles anonymous functions with parameters
            const fnMatch = line.match(/\bfn\s*\(([^)]*)\)/);
            if (fnMatch && fnMatch[1]) {
                const params = fnMatch[1].split(',').map(p => p.trim()).filter(Boolean);
                for (const param of params) {
                    // Extract just the identifier (in case of typed params in future)
                    const paramName = param.match(/^([a-zA-Z_]\w*)/);
                    if (paramName) {
                        declaredVars.add(paramName[1]);
                    }
                }
            }
        }

        // Keywords and native functions to skip
        const keywords = new Set([
            'let', 'if', 'else', 'return', 'true', 'false', 'null',
            'and', 'or', 'not', 'fn'
        ]);
        const natives = new Set([
            'json', 'parseJson', 'base64Encode', 'base64Decode', 'urlEncode', 'urlDecode',
            'toString', 'toNumber', 'print', 'length', 'substring', 'upper', 'lower',
            'trim', 'split', 'join', 'keys', 'values', 'contains', 'replace',
            'abs', 'round', 'floor', 'ceil'
        ]);

        // Second pass: check for undefined variable usage
        const reported = new Set<string>();

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // Skip comment lines
            if (line.trim().startsWith('//')) continue;

            // Remove inline comments
            const commentIndex = line.indexOf('//');
            if (commentIndex !== -1) {
                line = line.substring(0, commentIndex);
            }

            // Remove string literals to avoid false positives
            // Replace strings with spaces to preserve column positions
            line = line.replace(/"[^"]*"/g, (match) => ' '.repeat(match.length));
            line = line.replace(/'[^']*'/g, (match) => ' '.repeat(match.length));

            // Match identifiers that are NOT:
            // - After 'let ' (declaration)
            // - After '.' or '?.' (property access)
            // - Followed by '(' (function call)
            const identifierRegex = /\b([a-zA-Z_]\w*)\b/g;
            let match: RegExpExecArray | null;

            while ((match = identifierRegex.exec(line)) !== null) {
                const name = match[1];
                const column = match.index + 1;

                // Check if this is a declaration (preceded by 'let ')
                const beforeMatch = line.substring(0, match.index);
                if (beforeMatch.match(/\blet\s+$/)) continue;

                // Check if it's a property access (preceded by . or ?.)
                if (beforeMatch.match(/[.?]\s*$/)) continue;

                // Check if it's a function call (followed by '(')
                const afterMatch = line.substring(match.index + name.length);
                if (afterMatch.match(/^\s*\(/)) continue;

                // Skip keywords, natives, and declared vars
                if (keywords.has(name) || natives.has(name) || declaredVars.has(name)) continue;

                // Report only once per variable name
                if (!reported.has(name)) {
                    errors.push({
                        line: i + 1,
                        column,
                        message: `Undefined variable '${name}'`,
                        severity: 'warning',
                    });
                    reported.add(name);
                }
            }
        }

        return errors;
    }

    private severityToMarker(severity: 'error' | 'warning' | 'info'): 'Error' | 'Warning' | 'Info' {
        switch (severity) {
            case 'error': return 'Error';
            case 'warning': return 'Warning';
            case 'info': return 'Info';
        }
    }

    /**
     * Clears all markers from the model.
     */
    clearMarkers(model: editor.ITextModel): void {
        this.monaco.editor.setModelMarkers(model, this.owner, []);
    }
}
