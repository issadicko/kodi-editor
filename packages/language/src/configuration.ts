import type { languages } from 'monaco-editor';

/**
 * Language configuration for KodiScript.
 * Defines bracket matching, auto-closing pairs, folding, and comments.
 */
export const kodiScriptLanguageConfiguration: languages.LanguageConfiguration = {
    comments: {
        lineComment: '//',
    },

    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
    ],

    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string'] },
    ],

    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
    ],

    folding: {
        markers: {
            start: /^\s*\/\/\s*#?region\b/,
            end: /^\s*\/\/\s*#?endregion\b/,
        },
    },

    indentationRules: {
        increaseIndentPattern: /^.*\{[^}]*$/,
        decreaseIndentPattern: /^\s*\}/,
    },

    onEnterRules: [
        {
            // When pressing enter after opening brace
            beforeText: /^\s*.*\{\s*$/,
            afterText: /^\s*\}$/,
            action: { indentAction: 2 }, // IndentAction.IndentOutdent
        },
        {
            // When pressing enter after opening brace without closing
            beforeText: /^\s*.*\{\s*$/,
            action: { indentAction: 1 }, // IndentAction.Indent
        },
    ],
};
