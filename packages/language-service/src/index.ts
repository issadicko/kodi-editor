import type { Monaco } from '@issadicko/kodi-editor-language';
import { LANGUAGE_ID } from '@issadicko/kodi-editor-language';
import { createCompletionProvider } from './completion';
import { createHoverProvider } from './hover';
import { DiagnosticsService } from './diagnostics';

export { createCompletionProvider, NATIVE_FUNCTIONS, KEYWORDS } from './completion';
export { createHoverProvider } from './hover';
export { DiagnosticsService } from './diagnostics';
export type { DiagnosticError } from './diagnostics';

/**
 * Registers all KodiScript language services with Monaco.
 * Call this after registerKodiScriptLanguage from @issadicko/kodi-editor-language.
 *
 * @param monaco - The Monaco editor instance
 * @returns DiagnosticsService instance for manual validation
 *
 * @example
 * ```typescript
 * import * as monaco from 'monaco-editor';
 * import { registerKodiScriptLanguage } from '@issadicko/kodi-editor-language';
 * import { registerKodiScriptServices } from '@issadicko/kodi-editor-language-service';
 *
 * registerKodiScriptLanguage(monaco);
 * const diagnostics = registerKodiScriptServices(monaco);
 *
 * // Later, validate a model
 * await diagnostics.validate(editor.getModel());
 * ```
 */
export function registerKodiScriptServices(monaco: Monaco): DiagnosticsService {
    // Register completion provider
    monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, createCompletionProvider());

    // Register hover provider
    monaco.languages.registerHoverProvider(LANGUAGE_ID, createHoverProvider());

    // Create and return diagnostics service
    return new DiagnosticsService(monaco);
}
