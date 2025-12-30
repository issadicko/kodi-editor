import type { languages } from 'monaco-editor';

/**
 * Monarch grammar for KodiScript language.
 * Defines syntax highlighting rules based on kodi-ts lexer tokens.
 */
export const kodiScriptMonarch: languages.IMonarchLanguage = {
    defaultToken: 'invalid',
    tokenPostfix: '.kodi',

    keywords: ['let', 'if', 'else', 'return', 'and', 'or', 'not'],

    literals: ['true', 'false', 'null'],

    operators: [
        '=', '==', '!=', '<', '<=', '>', '>=',
        '+', '-', '*', '/', '%',
        '&&', '||', '!',
        '?.', '?:'
    ],

    // C-style delimiters
    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
        root: [
            // Whitespace
            [/[ \t\r\n]+/, 'white'],

            // Comments
            [/\/\/.*$/, 'comment'],

            // Keywords and literals
            [/[a-zA-Z_]\w*/, {
                cases: {
                    '@keywords': 'keyword',
                    '@literals': 'constant.language',
                    '@default': 'identifier'
                }
            }],

            // Numbers
            [/\d+\.\d+/, 'number.float'],
            [/\d+/, 'number'],

            // Strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'], // Non-terminated string
            [/'([^'\\]|\\.)*$/, 'string.invalid'], // Non-terminated string
            [/"/, 'string', '@string_double'],
            [/'/, 'string', '@string_single'],

            // Operators and delimiters
            [/\?\.|[?][:]/, 'operator.null-safety'], // Null-safety operators
            [/[{}()\[\]]/, '@brackets'],
            [/[;,.]/, 'delimiter'],
            [/@symbols/, {
                cases: {
                    '@operators': 'operator',
                    '@default': ''
                }
            }],
        ],

        string_double: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],

        string_single: [
            [/[^\\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, 'string', '@pop']
        ],
    }
};
