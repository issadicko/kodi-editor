import type { languages } from 'monaco-editor';
import { NATIVE_FUNCTIONS, KEYWORDS } from './completion';

/**
 * Creates a hover provider for KodiScript.
 * Shows documentation for keywords and native functions.
 */
export function createHoverProvider(): languages.HoverProvider {
    return {
        provideHover(model, position) {
            const word = model.getWordAtPosition(position);
            if (!word) return null;

            const text = word.word;

            // Check if it's a native function
            const nativeFn = NATIVE_FUNCTIONS.find(fn => fn.name === text);
            if (nativeFn) {
                return {
                    range: {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn,
                    },
                    contents: [
                        { value: `**${nativeFn.name}**` },
                        { value: `\`\`\`kodiscript\n${nativeFn.signature}\n\`\`\`` },
                        { value: nativeFn.description },
                        { value: `**Example:**\n\`\`\`kodiscript\n${nativeFn.example}\n\`\`\`` },
                    ],
                };
            }

            // Check if it's a keyword
            const keyword = KEYWORDS.find(kw => kw.name === text);
            if (keyword) {
                return {
                    range: {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn,
                    },
                    contents: [
                        { value: `**${keyword.name}** _(keyword)_` },
                        { value: keyword.description },
                    ],
                };
            }

            // Check for null-safety operators
            const lineContent = model.getLineContent(position.lineNumber);
            const charBefore = lineContent.charAt(word.startColumn - 2);
            const charAfter = lineContent.charAt(word.endColumn - 1);

            if (charBefore === '?' && charAfter === '.') {
                return {
                    range: {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn - 1,
                        endColumn: word.endColumn + 1,
                    },
                    contents: [
                        { value: '**?.** _(safe navigation operator)_' },
                        { value: 'Safely accesses a property. Returns `null` if the left side is `null` instead of throwing an error.' },
                        { value: '**Example:**\n```kodiscript\nlet status = user?.status\n```' },
                    ],
                };
            }

            return null;
        },
    };
}
