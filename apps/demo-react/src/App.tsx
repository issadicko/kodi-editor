import { useState, useRef, useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import {
  registerKodiScriptLanguage,
  LANGUAGE_ID,
  THEME_DARK,
  THEME_LIGHT,
} from '@issadicko/kodi-editor-language';
import { KodiScript, Lexer, Parser } from '@issadicko/kodi-script';
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

interface ParseError {
  message: string;
  line?: number;
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [output, setOutput] = useState<string[]>([]);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [parseErrors, setParseErrors] = useState<ParseError[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [lineCount, setLineCount] = useState(0);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Validate code on change (debounced)
  const validateCode = useCallback((code: string) => {
    try {
      const lexer = new Lexer(code);
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
      parser.parse();
      setParseErrors([]);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      // Try to extract line number from error message
      const lineMatch = message.match(/line (\d+)/i);
      const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;
      setParseErrors([{ message, line }]);
    }
  }, []);

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

    // Initial validation
    validateCode(DEFAULT_CODE);

    // Listen for cursor position changes
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({ line: e.position.lineNumber, column: e.position.column });
    });

    // Listen for content changes - validate in real-time
    let debounceTimer: ReturnType<typeof setTimeout>;
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      setLineCount(editor.getModel()?.getLineCount() || 0);

      // Debounce validation to avoid too many calls
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        validateCode(code);
      }, 300);
    });

    return () => {
      clearTimeout(debounceTimer);
      editor.dispose();
    };
  }, [validateCode]);

  // Update theme
  useEffect(() => {
    monaco.editor.setTheme(theme === 'dark' ? THEME_DARK : THEME_LIGHT);
  }, [theme]);

  const handleRun = () => {
    if (!editorRef.current) return;

    const code = editorRef.current.getValue();
    setRuntimeError(null);

    try {
      const result = KodiScript.run(code);
      setOutput(result.output);
    } catch (e) {
      setRuntimeError(e instanceof Error ? e.message : String(e));
      setOutput([]);
    }
  };

  const handleClear = () => {
    setOutput([]);
    setRuntimeError(null);
  };

  const hasErrors = parseErrors.length > 0 || runtimeError !== null;
  const errorCount = parseErrors.length + (runtimeError ? 1 : 0);

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
              {hasErrors ? (
                <span className="status-error">
                  <span className="error-dot" /> {errorCount} Error{errorCount > 1 ? 's' : ''}
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
            {parseErrors.length > 0 && (
              <div className="error-list">
                {parseErrors.map((err, i) => (
                  <div key={i} className="error">
                    {err.line && <span className="error-line">Line {err.line}:</span>} {err.message}
                  </div>
                ))}
              </div>
            )}
            {runtimeError ? (
              <div className="error">{runtimeError}</div>
            ) : output.length > 0 ? (
              output.map((line, i) => <div key={i}>{line}</div>)
            ) : parseErrors.length === 0 ? (
              <div className="placeholder">Click "Run" to execute the script...</div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
