import { useState, useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import {
  registerKodiScriptLanguage,
  LANGUAGE_ID,
  THEME_DARK,
  THEME_LIGHT,
} from '@issadicko/kodi-editor-language';
import { KodiScript } from '@issadicko/kodi-script';
import './App.css';

// Register language once
let languageRegistered = false;

const DEFAULT_CODE = `let name = "World"
print("Hello " + name)

let greet = fn(who) {
    return "Hello, " + who + "!"
}

print(greet("KodiScript"))

let a = 5
let b = 10
print("Sum: " + (a + b))
`;

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Register language
    if (!languageRegistered) {
      registerKodiScriptLanguage(monaco);
      languageRegistered = true;
    }

    // Create editor
    const editor = monaco.editor.create(containerRef.current, {
      value: DEFAULT_CODE,
      language: LANGUAGE_ID,
      theme: THEME_DARK,
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      tabSize: 2,
    });

    editorRef.current = editor;

    return () => {
      editor.dispose();
    };
  }, []);

  // Update theme
  useEffect(() => {
    monaco.editor.setTheme(theme === 'dark' ? THEME_DARK : THEME_LIGHT);
  }, [theme]);

  const handleRun = () => {
    if (!editorRef.current) return;

    const code = editorRef.current.getValue();
    setError(null);

    try {
      const result = KodiScript.run(code);
      setOutput(result.output);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setOutput([]);
    }
  };

  const handleClear = () => {
    setOutput([]);
    setError(null);
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>🚀 KodiScript Editor</h1>
        <div className="controls">
          <button className="btn run" onClick={handleRun}>
            ▶ Run
          </button>
          <button className="btn clear" onClick={handleClear}>
            Clear
          </button>
          <button
            className="btn theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="editor-container" ref={containerRef} />

        <div className="output-panel">
          <h3>Output</h3>
          <div className="output-content">
            {error ? (
              <div className="error">{error}</div>
            ) : output.length > 0 ? (
              output.map((line, i) => <div key={i}>{line}</div>)
            ) : (
              <div className="placeholder">Click "Run" to execute the script...</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
