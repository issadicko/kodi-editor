import type { languages, editor } from 'monaco-editor';

/**
 * Monaco Editor instance type.
 * This represents the global monaco namespace.
 */
export interface Monaco {
    languages: {
        register(language: languages.ILanguageExtensionPoint): void;
        setLanguageConfiguration(languageId: string, configuration: languages.LanguageConfiguration): void;
        setMonarchTokensProvider(languageId: string, languageDef: languages.IMonarchLanguage): void;
        registerCompletionItemProvider(languageId: string, provider: languages.CompletionItemProvider): void;
        registerHoverProvider(languageId: string, provider: languages.HoverProvider): void;
    };
    editor: {
        create(element: HTMLElement, options?: editor.IStandaloneEditorConstructionOptions): editor.IStandaloneCodeEditor;
        defineTheme(themeName: string, themeData: editor.IStandaloneThemeData): void;
        setModelMarkers(model: editor.ITextModel, owner: string, markers: editor.IMarkerData[]): void;
    };
    MarkerSeverity: typeof import('monaco-editor').MarkerSeverity;
}
