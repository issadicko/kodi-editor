import type { Monaco } from './types';
import { kodiScriptMonarch } from './monarch';
import { kodiScriptLanguageConfiguration } from './configuration';
import { kodiDarkTheme, kodiLightTheme } from './themes';

export const LANGUAGE_ID = 'kodiscript';
export const THEME_DARK = 'kodi-dark';
export const THEME_LIGHT = 'kodi-light';

/**
 * Registers the KodiScript language with Monaco Editor.
 * Call this function once during application initialization.
 * 
 * @param monaco - The Monaco editor instance
 * 
 * @example
 * ```typescript
 * import * as monaco from 'monaco-editor';
 * import { registerKodiScriptLanguage } from '@kodi/editor-language';
 * 
 * registerKodiScriptLanguage(monaco);
 * ```
 */
export function registerKodiScriptLanguage(monaco: Monaco): void {
    // Register language
    monaco.languages.register({
        id: LANGUAGE_ID,
        extensions: ['.kodi', '.kodiscript'],
        aliases: ['KodiScript', 'kodi'],
        mimetypes: ['text/x-kodiscript'],
    });

    // Set language configuration
    monaco.languages.setLanguageConfiguration(LANGUAGE_ID, kodiScriptLanguageConfiguration);

    // Set Monarch tokenizer
    monaco.languages.setMonarchTokensProvider(LANGUAGE_ID, kodiScriptMonarch);

    // Register themes
    monaco.editor.defineTheme(THEME_DARK, kodiDarkTheme);
    monaco.editor.defineTheme(THEME_LIGHT, kodiLightTheme);
}

// Re-export all modules
export { kodiScriptMonarch } from './monarch';
export { kodiScriptLanguageConfiguration } from './configuration';
export { kodiDarkTheme, kodiLightTheme } from './themes';
export type { Monaco } from './types';
