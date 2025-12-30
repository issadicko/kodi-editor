import type { editor } from 'monaco-editor';

/**
 * Dark theme for KodiScript editor.
 * Uses a modern color palette inspired by VS Code dark themes.
 */
export const kodiDarkTheme: editor.IStandaloneThemeData = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'constant.language', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'identifier', foreground: '9CDCFE' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'number.float', foreground: 'B5CEA8' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'string.escape', foreground: 'D7BA7D' },
        { token: 'string.invalid', foreground: 'F44747' },
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'operator.null-safety', foreground: 'DCDCAA', fontStyle: 'bold' },
        { token: 'delimiter', foreground: 'D4D4D4' },
        { token: 'invalid', foreground: 'F44747' },
    ],
    colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editorCursor.foreground': '#AEAFAD',
        'editor.lineHighlightBackground': '#2D2D30',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41',
    },
};

/**
 * Light theme for KodiScript editor.
 */
export const kodiLightTheme: editor.IStandaloneThemeData = {
    base: 'vs',
    inherit: true,
    rules: [
        { token: 'keyword', foreground: 'AF00DB', fontStyle: 'bold' },
        { token: 'constant.language', foreground: '0000FF', fontStyle: 'bold' },
        { token: 'identifier', foreground: '001080' },
        { token: 'number', foreground: '098658' },
        { token: 'number.float', foreground: '098658' },
        { token: 'string', foreground: 'A31515' },
        { token: 'string.escape', foreground: 'EE0000' },
        { token: 'string.invalid', foreground: 'CD3131' },
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'operator', foreground: '000000' },
        { token: 'operator.null-safety', foreground: '795E26', fontStyle: 'bold' },
        { token: 'delimiter', foreground: '000000' },
        { token: 'invalid', foreground: 'CD3131' },
    ],
    colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editorCursor.foreground': '#000000',
        'editor.lineHighlightBackground': '#F3F3F3',
        'editorLineNumber.foreground': '#237893',
        'editor.selectionBackground': '#ADD6FF',
        'editor.inactiveSelectionBackground': '#E5EBF1',
    },
};
