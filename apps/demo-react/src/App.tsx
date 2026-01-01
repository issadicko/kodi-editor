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

const SDK_VERSION = '0.1.1';

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
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [lineCount, setLineCount] = useState(0);
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
    setLineCount(editor.getModel()?.getLineCount() || 0);

    // Listen for cursor position changes
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({ line: e.position.lineNumber, column: e.position.column });
    });

    // Listen for content changes
    editor.onDidChangeModelContent(() => {
      setLineCount(editor.getModel()?.getLineCount() || 0);
    });

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
        <div className="editor-wrapper">
          <div className="editor-container" ref={containerRef} />
          <div className="status-bar">
            <div className="status-left">
              {error ? (
                <span className="status-error">
                  <span className="error-dot" /> Error
                </span>
              ) : (
                <span className="status-ok">
                  <span className="ok-dot" /> Ready
                </span>
              )}
            </div>
            <div className="status-right">
              <span className="status-item">Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
              <span className="status-item">{lineCount} lines</span>
              <span className="status-item">KodiScript</span>
              <span className="status-item">SDK v{SDK_VERSION}</span>
            </div>
          </div>
        </div>

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
