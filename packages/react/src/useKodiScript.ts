import { useCallback, useState } from 'react';
import { KodiScript } from '@issadicko/kodi-script';

export interface UseKodiScriptResult {
    /** Execute the script */
    run: (source: string, variables?: Record<string, unknown>) => void;
    /** Output lines from execution */
    output: string[];
    /** Execution result */
    result: unknown;
    /** Error message if any */
    error: string | null;
    /** Is currently executing */
    isRunning: boolean;
    /** Clear output */
    clearOutput: () => void;
}

/**
 * React hook for executing KodiScript code.
 */
export function useKodiScript(): UseKodiScriptResult {
    const [output, setOutput] = useState<string[]>([]);
    const [result, setResult] = useState<unknown>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const run = useCallback((source: string, variables?: Record<string, unknown>) => {
        setIsRunning(true);
        setError(null);

        try {
            const scriptResult = KodiScript.run(source, variables);
            setOutput(scriptResult.output);
            setResult(scriptResult.result);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
            setOutput([]);
            setResult(null);
        } finally {
            setIsRunning(false);
        }
    }, []);

    const clearOutput = useCallback(() => {
        setOutput([]);
        setResult(null);
        setError(null);
    }, []);

    return {
        run,
        output,
        result,
        error,
        isRunning,
        clearOutput,
    };
}

export default useKodiScript;
