import React, { useRef, useEffect, useCallback, useState } from 'react';
import type * as Monaco from 'monaco-editor';
import {
    registerKodiScriptLanguage,
    LANGUAGE_ID,
    THEME_DARK,
    THEME_LIGHT,
} from '@issadicko/kodi-editor-language';

export interface KodiScriptEditorProps {
    /** Initial source code */
    value?: string;
    /** Called when editor content changes */
    onChange?: (value: string) => void;
    /** Theme: 'dark' or 'light' */
    theme?: 'dark' | 'light';
    /** Editor height (default: 400px) */
    height?: string | number;
    /** Editor width (default: 100%) */
    width?: string | number;
    /** Read-only mode */
    readOnly?: boolean;
    /** Additional Monaco editor options */
    options?: Monaco.editor.IStandaloneEditorConstructionOptions;
    /** Called when editor is mounted */
    onMount?: (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => void;
}

let languageRegistered = false;

/**
 * KodiScript Editor React Component
 * Integrates Monaco Editor with KodiScript language support.
 */
export const KodiScriptEditor: React.FC<KodiScriptEditorProps> = ({
    value = '',
    onChange,
    theme = 'dark',
    height = 400,
    width = '100%',
    readOnly = false,
    options = {},
    onMount,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<typeof Monaco | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize Monaco editor
    useEffect(() => {
        let disposed = false;

        const initEditor = async () => {
            if (!containerRef.current) return;

            // Dynamic import Monaco to support SSR
            const monaco = await import('monaco-editor');

            if (disposed) return;

            monacoRef.current = monaco;

            // Register language once
            if (!languageRegistered) {
                registerKodiScriptLanguage(monaco);
                languageRegistered = true;
            }

            // Create editor
            const editor = monaco.editor.create(containerRef.current, {
                value,
                language: LANGUAGE_ID,
                theme: theme === 'dark' ? THEME_DARK : THEME_LIGHT,
                readOnly,
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: 2,
                ...options,
            });

            editorRef.current = editor;
            setIsLoading(false);

            // Notify mount
            if (onMount) {
                onMount(editor, monaco);
            }

            // Listen for changes
            editor.onDidChangeModelContent(() => {
                if (onChange) {
                    onChange(editor.getValue());
                }
            });
        };

        initEditor();

        return () => {
            disposed = true;
            if (editorRef.current) {
                editorRef.current.dispose();
                editorRef.current = null;
            }
        };
    }, []);

    // Update theme
    useEffect(() => {
        if (monacoRef.current) {
            monacoRef.current.editor.setTheme(theme === 'dark' ? THEME_DARK : THEME_LIGHT);
        }
    }, [theme]);

    // Update value (external changes)
    useEffect(() => {
        if (editorRef.current) {
            const currentValue = editorRef.current.getValue();
            if (value !== currentValue) {
                editorRef.current.setValue(value);
            }
        }
    }, [value]);

    // Update readOnly
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.updateOptions({ readOnly });
        }
    }, [readOnly]);

    const heightStyle = typeof height === 'number' ? `${height}px` : height;
    const widthStyle = typeof width === 'number' ? `${width}px` : width;

    return (
        <div
            ref={containerRef}
            style={{
                height: heightStyle,
                width: widthStyle,
                position: 'relative',
            }}
        >
            {isLoading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                        color: theme === 'dark' ? '#ffffff' : '#000000',
                    }}
                >
                    Loading editor...
                </div>
            )}
        </div>
    );
};

export default KodiScriptEditor;
