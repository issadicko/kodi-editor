// React components and hooks for KodiScript editor
export { KodiScriptEditor, type KodiScriptEditorProps } from './KodiScriptEditor';
export { useKodiScript, type UseKodiScriptResult } from './useKodiScript';

// Re-export language utilities
export {
    LANGUAGE_ID,
    THEME_DARK,
    THEME_LIGHT,
    registerKodiScriptLanguage,
} from '@issadicko/kodi-editor-language';
