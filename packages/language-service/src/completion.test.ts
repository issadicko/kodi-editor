import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { Lexer, Parser } from '@issadicko/kodi-script';
import { KEYWORDS, NATIVE_FUNCTIONS, SNIPPETS } from './completion';
import { DiagnosticsService } from './diagnostics';

// The reference interpreter, when this package is checked out inside the kodi-script tree.
const KODI_GO = fileURLToPath(new URL('../../../../kodi-go/', import.meta.url));
const hasReference = existsSync(KODI_GO);

function goSource(path: string): string {
    return readFileSync(`${KODI_GO}${path}`, 'utf8');
}

function goFunctionNames(): string[] {
    const natives = [...goSource('natives/natives.go').matchAll(/r\.funcs\["(\w+)"\]/g)].map(m => m[1]);
    const table = goSource('interpreter/interpreter.go').match(/interpBuiltins = map[^{]*\{([\s\S]*?)\n\t\}/)?.[1] ?? '';
    const builtins = [...table.matchAll(/^\s*"(\w+)":/gm)].map(m => m[1]);
    return [...natives, ...builtins].sort();
}

function goKeywords(): string[] {
    const lookup = goSource('token/token.go').match(/func LookupIdent[\s\S]*?\n}/)?.[0] ?? '';
    return [...lookup.matchAll(/case "(\w+)":/g)].map(m => m[1]).sort();
}

function parses(code: string): void {
    new Parser(new Lexer(code).tokenize()).parse();
}

/** The text a snippet leaves once every placeholder keeps its default. */
function expanded(insertText: string): string {
    return insertText.replace(/\$\{\d+:([^}]*)\}/g, '$1').replace(/\$\d+/g, '');
}

async function warnings(code: string) {
    const monaco = {
        MarkerSeverity: { Error: 8, Warning: 4, Info: 2 },
        editor: { setModelMarkers: () => undefined },
    };
    const service = new DiagnosticsService(monaco as never);
    return service.validate({ getValue: () => code } as never);
}

describe('NATIVE_FUNCTIONS', () => {
    const names = NATIVE_FUNCTIONS.map(fn => fn.name);

    it('lists each function once', () => {
        expect(new Set(names).size).toBe(names.length);
    });

    it.skipIf(!hasReference)('matches the functions of the reference interpreter', () => {
        expect([...names].sort()).toEqual(goFunctionNames());
    });

    it.each(NATIVE_FUNCTIONS)('$name: example calls the function and parses', fn => {
        expect(fn.signature.startsWith(`${fn.name}(`)).toBe(true);
        expect(fn.example).toMatch(new RegExp(`\\b${fn.name}\\(`));
        expect(() => parses(fn.example)).not.toThrow();
    });
});

describe('KEYWORDS', () => {
    it.skipIf(!hasReference)('matches the reserved words of the reference lexer', () => {
        expect(KEYWORDS.map(kw => kw.name).sort()).toEqual(goKeywords());
    });
});

describe('SNIPPETS', () => {
    it.each(SNIPPETS)('$label: expanded snippet parses', snippet => {
        expect(() => parses(expanded(snippet.insertText))).not.toThrow();
    });
});

describe('DiagnosticsService', () => {
    it('does not flag a native function referenced without a call', async () => {
        expect(await warnings('let up = toUpperCase\nup("a")')).toEqual([]);
    });

    it('does not flag the names that for, catch and a named fn declare', async () => {
        const code = [
            'fn double(x) { x * 2 }',
            'let twice = double',
            'for (item in [1, 2, 3]) {',
            '    if (item == 2) { continue }',
            '    if (item == 3) { break }',
            '}',
            'try { jsonParse("{") } catch (e) { print(e) }',
        ].join('\n');

        expect(await warnings(code)).toEqual([]);
    });

    it('flags a word operator, which the language does not have', async () => {
        const found = await warnings('let ok = true\nlet both = ok && not ok');

        expect(found.map(w => w.message)).toContain("Undefined variable 'not'");
    });
});
