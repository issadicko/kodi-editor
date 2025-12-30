import { Injectable, Inject, InjectionToken, Optional, OnDestroy } from '@angular/core';
import type { Monaco } from '@issadicko/kodi-editor-language';
import { registerKodiScriptLanguage, THEME_DARK } from '@issadicko/kodi-editor-language';
import { registerKodiScriptServices, DiagnosticsService } from '@issadicko/kodi-editor-language-service';

/**
 * Injection token for Monaco Editor loader.
 * Use this to provide a custom Monaco loader.
 */
export const MONACO_LOADER = new InjectionToken<() => Promise<Monaco>>('MONACO_LOADER');

/**
 * Injection token for Monaco assets base path.
 * Default: 'assets/monaco-editor/min/vs'
 */
export const MONACO_BASE_PATH = new InjectionToken<string>('MONACO_BASE_PATH');

declare global {
    interface Window {
        require: {
            config: (config: { paths: Record<string, string> }) => void;
            (deps: string[], callback: (...modules: unknown[]) => void): void;
        };
        monaco: Monaco;
    }
}

/**
 * KodiScript editor service for Angular.
 * Handles Monaco Editor initialization and language registration.
 */
@Injectable({
    providedIn: 'root',
})
export class KodiEditorService implements OnDestroy {
    private monacoPromise: Promise<Monaco> | null = null;
    private diagnosticsService: DiagnosticsService | null = null;
    private isRegistered = false;

    constructor(
        @Optional() @Inject(MONACO_LOADER) private customLoader: (() => Promise<Monaco>) | null,
        @Optional() @Inject(MONACO_BASE_PATH) private basePath: string | null,
    ) { }

    /**
     * Loads Monaco Editor and registers KodiScript language.
     * Returns the same Promise on subsequent calls.
     */
    async loadMonaco(): Promise<Monaco> {
        if (this.monacoPromise) {
            return this.monacoPromise;
        }

        this.monacoPromise = this.doLoadMonaco();
        return this.monacoPromise;
    }

    private async doLoadMonaco(): Promise<Monaco> {
        let monaco: Monaco;

        if (this.customLoader) {
            monaco = await this.customLoader();
        } else {
            // Use AMD loader from Monaco assets
            monaco = await this.loadMonacoAMD();
        }

        if (!this.isRegistered) {
            registerKodiScriptLanguage(monaco);
            this.diagnosticsService = registerKodiScriptServices(monaco);
            this.isRegistered = true;
        }

        return monaco;
    }

    /**
     * Loads Monaco via AMD (RequireJS) loader.
     * This is more reliable in Angular apps with Vite.
     */
    private loadMonacoAMD(): Promise<Monaco> {
        return new Promise((resolve, reject) => {
            const basePath = this.basePath || 'assets/monaco-editor/vs';

            // Check if already loaded
            if (typeof window.monaco !== 'undefined') {
                resolve(window.monaco);
                return;
            }

            // Check if loader script already exists
            const existingScript = document.querySelector('script[data-monaco-loader]');
            if (existingScript) {
                // Wait for monaco to be available
                const checkMonaco = setInterval(() => {
                    if (typeof window.monaco !== 'undefined') {
                        clearInterval(checkMonaco);
                        resolve(window.monaco);
                    }
                }, 50);
                return;
            }

            // Load the AMD loader script
            const script = document.createElement('script');
            script.setAttribute('data-monaco-loader', 'true');
            script.src = `${basePath}/loader.js`;

            script.onload = () => {
                window.require.config({ paths: { vs: basePath } });
                window.require(['vs/editor/editor.main'], () => {
                    resolve(window.monaco);
                });
            };

            script.onerror = () => {
                reject(new Error(`Failed to load Monaco loader from ${basePath}/loader.js`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Gets the diagnostics service for validation.
     */
    getDiagnosticsService(): DiagnosticsService | null {
        return this.diagnosticsService;
    }

    /**
     * Returns the default theme name.
     */
    getDefaultTheme(): string {
        return THEME_DARK;
    }

    ngOnDestroy(): void {
        this.monacoPromise = null;
        this.diagnosticsService = null;
        this.isRegistered = false;
    }
}
