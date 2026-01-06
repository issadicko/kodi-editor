import type { languages } from 'monaco-editor';

/**
 * KodiScript native functions with their documentation.
 */
export const NATIVE_FUNCTIONS = [
    {
        name: 'json',
        signature: 'json(value: any): string',
        description: 'Converts a value to its JSON string representation.',
        example: 'json(myObject)',
    },
    {
        name: 'parseJson',
        signature: 'parseJson(jsonString: string): any',
        description: 'Parses a JSON string into an object.',
        example: 'parseJson("{\\\"key\\\": \\\"value\\\"}")',
    },
    {
        name: 'base64Encode',
        signature: 'base64Encode(value: string): string',
        description: 'Encodes a string to Base64.',
        example: 'base64Encode("Hello")',
    },
    {
        name: 'base64Decode',
        signature: 'base64Decode(encoded: string): string',
        description: 'Decodes a Base64 string.',
        example: 'base64Decode("SGVsbG8=")',
    },
    {
        name: 'urlEncode',
        signature: 'urlEncode(value: string): string',
        description: 'URL-encodes a string.',
        example: 'urlEncode("hello world")',
    },
    {
        name: 'urlDecode',
        signature: 'urlDecode(encoded: string): string',
        description: 'URL-decodes a string.',
        example: 'urlDecode("hello%20world")',
    },
    {
        name: 'toString',
        signature: 'toString(value: any): string',
        description: 'Converts any value to a string.',
        example: 'toString(42)',
    },
    {
        name: 'toNumber',
        signature: 'toNumber(value: string): number',
        description: 'Converts a string to a number.',
        example: 'toNumber("42")',
    },
    {
        name: 'print',
        signature: 'print(...args: any[]): void',
        description: 'Outputs values to the console.',
        example: 'print("Hello", name)',
    },
    {
        name: 'length',
        signature: 'length(value: string | array): number',
        description: 'Returns the length of a string or array.',
        example: 'length("Hello")',
    },
    {
        name: 'substring',
        signature: 'substring(str: string, start: number, end?: number): string',
        description: 'Extracts a portion of a string.',
        example: 'substring("Hello", 0, 3)',
    },
    {
        name: 'upper',
        signature: 'upper(value: string): string',
        description: 'Converts a string to uppercase.',
        example: 'upper("hello")',
    },
    {
        name: 'lower',
        signature: 'lower(value: string): string',
        description: 'Converts a string to lowercase.',
        example: 'lower("HELLO")',
    },
    {
        name: 'trim',
        signature: 'trim(value: string): string',
        description: 'Removes whitespace from both ends of a string.',
        example: 'trim("  hello  ")',
    },
    {
        name: 'split',
        signature: 'split(str: string, delimiter: string): array',
        description: 'Splits a string into an array by delimiter.',
        example: 'split("a,b,c", ",")',
    },
    {
        name: 'join',
        signature: 'join(arr: array, delimiter: string): string',
        description: 'Joins array elements into a string with a delimiter.',
        example: 'join(["a", "b", "c"], ",")',
    },
    {
        name: 'keys',
        signature: 'keys(obj: object): array',
        description: 'Returns an array of the object\'s keys.',
        example: 'keys({"a": 1, "b": 2})',
    },
    {
        name: 'values',
        signature: 'values(obj: object): array',
        description: 'Returns an array of the object\'s values.',
        example: 'values({"a": 1, "b": 2})',
    },
    {
        name: 'contains',
        signature: 'contains(collection: string | array, item: any): boolean',
        description: 'Checks if a string or array contains an item.',
        example: 'contains("Hello", "ell")',
    },
    {
        name: 'replace',
        signature: 'replace(str: string, search: string, replacement: string): string',
        description: 'Replaces occurrences of a substring.',
        example: 'replace("Hello World", "World", "KodiScript")',
    },
    {
        name: 'abs',
        signature: 'abs(value: number): number',
        description: 'Returns the absolute value of a number.',
        example: 'abs(-42)',
    },
    {
        name: 'round',
        signature: 'round(value: number): number',
        description: 'Rounds a number to the nearest integer.',
        example: 'round(3.7)',
    },
    {
        name: 'floor',
        signature: 'floor(value: number): number',
        description: 'Rounds a number down to the nearest integer.',
        example: 'floor(3.7)',
    },
    {
        name: 'ceil',
        signature: 'ceil(value: number): number',
        description: 'Rounds a number up to the nearest integer.',
        example: 'ceil(3.2)',
    },
];

/**
 * KodiScript keywords for completion.
 */
export const KEYWORDS = [
    { name: 'let', description: 'Declare a variable' },
    { name: 'if', description: 'Conditional statement' },
    { name: 'else', description: 'Alternative branch for if statement' },
    { name: 'return', description: 'Return a value from a function' },
    { name: 'true', description: 'Boolean true literal' },
    { name: 'false', description: 'Boolean false literal' },
    { name: 'null', description: 'Null value literal' },
    { name: 'and', description: 'Logical AND operator' },
    { name: 'or', description: 'Logical OR operator' },
    { name: 'not', description: 'Logical NOT operator' },
    { name: 'fn', description: 'Define a function literal' },
    { name: 'for', description: 'For-in loop statement' },
    { name: 'in', description: 'Iterate over collection' },
    { name: 'while', description: 'While loop statement' },
];

/**
 * KodiScript code snippets.
 */
export const SNIPPETS = [
    {
        label: 'let',
        detail: 'Variable declaration',
        documentation: 'Declare a new variable',
        insertText: 'let ${1:name} = ${2:value}',
    },
    {
        label: 'letfn',
        detail: 'Function variable',
        documentation: 'Declare a function variable',
        insertText: 'let ${1:name} = fn(${2:params}) {\n\t${3:// body}\n\treturn ${4:result}\n}',
    },
    {
        label: 'fn',
        detail: 'Function literal',
        documentation: 'Create a function literal',
        insertText: 'fn(${1:params}) {\n\t${2:// body}\n\treturn ${3:result}\n}',
    },
    {
        label: 'if',
        detail: 'If statement',
        documentation: 'Conditional if statement',
        insertText: 'if (${1:condition}) {\n\t$0\n}',
    },
    {
        label: 'ife',
        detail: 'If-else statement',
        documentation: 'Conditional if-else statement',
        insertText: 'if (${1:condition}) {\n\t${2:// true branch}\n} else {\n\t${3:// false branch}\n}',
    },
    {
        label: 'ifelif',
        detail: 'If-else if-else chain',
        documentation: 'Multiple condition branches',
        insertText: 'if (${1:condition1}) {\n\t${2:// branch 1}\n} else if (${3:condition2}) {\n\t${4:// branch 2}\n} else {\n\t${5:// default}\n}',
    },
    {
        label: 'for',
        detail: 'For-in loop',
        documentation: 'Iterate over array or object keys',
        insertText: 'for (${1:item} in ${2:collection}) {\n\t$0\n}',
    },
    {
        label: 'while',
        detail: 'While loop',
        documentation: 'Execute block while condition is true',
        insertText: 'while (${1:condition}) {\n\t$0\n}',
    },
    {
        label: 'ternary',
        detail: 'Ternary expression',
        documentation: 'Inline conditional expression',
        insertText: '${1:condition} ? ${2:trueValue} : ${3:falseValue}',
    },
    {
        label: 'obj',
        detail: 'Object literal',
        documentation: 'Create an object',
        insertText: '{\n\t"${1:key}": ${2:value}$0\n}',
    },
    {
        label: 'arr',
        detail: 'Array literal',
        documentation: 'Create an array',
        insertText: '[${1:item1}, ${2:item2}]',
    },
    {
        label: 'print',
        detail: 'Print statement',
        documentation: 'Output a value to console',
        insertText: 'print(${1:value})',
    },
    {
        label: 'printv',
        detail: 'Print with label',
        documentation: 'Print a labeled value for debugging',
        insertText: 'print("${1:label}:", ${2:value})',
    },
    {
        label: 'json',
        detail: 'JSON stringify',
        documentation: 'Convert to JSON string',
        insertText: 'json(${1:value})',
    },
    {
        label: 'parsejson',
        detail: 'Parse JSON',
        documentation: 'Parse JSON string to object',
        insertText: 'parseJson(${1:jsonString})',
    },
    {
        label: 'nullcheck',
        detail: 'Null check pattern',
        documentation: 'Safe null checking with default',
        insertText: '${1:value} ?? ${2:defaultValue}',
    },
    {
        label: 'nullsafe',
        detail: 'Null-safe access',
        documentation: 'Access property with null safety',
        insertText: '${1:obj}?.${2:property}',
    },
    {
        label: 'comment',
        detail: 'Comment block',
        documentation: 'Add a comment',
        insertText: '// ${1:description}',
    },
    {
        label: 'header',
        detail: 'File header comment',
        documentation: 'Add a header comment block',
        insertText: '// ================================\n// ${1:Title}\n// ${2:Description}\n// ================================\n',
    },
    {
        label: 'todo',
        detail: 'TODO comment',
        documentation: 'Add a TODO marker',
        insertText: '// TODO: ${1:description}',
    },
    {
        label: 'config',
        detail: 'Configuration object',
        documentation: 'Create a configuration object pattern',
        insertText: 'let ${1:config} = {\n\t"${2:setting1}": ${3:value1},\n\t"${4:setting2}": ${5:value2}\n}',
    },
    {
        label: 'validate',
        detail: 'Validation pattern',
        documentation: 'Input validation with error message',
        insertText: 'if (${1:condition}) {\n\treturn {"error": "${2:error message}"}\n}',
    },
    {
        label: 'response',
        detail: 'API response object',
        documentation: 'Create an API response object',
        insertText: '{\n\t"success": ${1:true},\n\t"data": ${2:result},\n\t"message": "${3:description}"\n}',
    },
    {
        label: 'transform',
        detail: 'Data transformation',
        documentation: 'Transform input data pattern',
        insertText: 'let ${1:input} = ${2:data}\nlet ${3:result} = ${4:transform}(${1:input})\nreturn ${3:result}',
    },
];

/**
 * Creates a Monaco CompletionItemProvider for KodiScript.
 */
export function createCompletionProvider(): languages.CompletionItemProvider {
    return {
        triggerCharacters: ['.', '?', '"', "'"],

        provideCompletionItems(model, position) {
            const word = model.getWordUntilPosition(position);
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
            };

            // Get line text to determine context
            const lineText = model.getLineContent(position.lineNumber);
            const textBefore = lineText.substring(0, position.column - 1);

            // Check if inside a comment - don't suggest anything
            if (textBefore.includes('//')) {
                return { suggestions: [] };
            }

            const suggestions: languages.CompletionItem[] = [];

            // Add keyword suggestions
            for (const kw of KEYWORDS) {
                suggestions.push({
                    label: kw.name,
                    kind: 17, // CompletionItemKind.Keyword
                    insertText: kw.name,
                    detail: kw.description,
                    range,
                    sortText: '1_' + kw.name, // Keywords first
                });
            }

            // Add native function suggestions
            for (const fn of NATIVE_FUNCTIONS) {
                suggestions.push({
                    label: fn.name,
                    kind: 1, // CompletionItemKind.Function
                    insertText: `${fn.name}($1)`,
                    insertTextRules: 4, // InsertTextRule.InsertAsSnippet
                    detail: fn.signature,
                    documentation: {
                        value: `${fn.description}\n\n**Example:**\n\`\`\`kodi\n${fn.example}\n\`\`\``,
                    },
                    range,
                    sortText: '2_' + fn.name, // Functions second
                });
            }

            // Add snippets
            for (const snippet of SNIPPETS) {
                suggestions.push({
                    label: snippet.label,
                    kind: 27, // CompletionItemKind.Snippet
                    insertText: snippet.insertText,
                    insertTextRules: 4, // InsertTextRule.InsertAsSnippet
                    detail: '⚡ ' + snippet.detail,
                    documentation: snippet.documentation,
                    range,
                    sortText: '0_' + snippet.label, // Snippets first (with priority sorting)
                });
            }

            return { suggestions };
        },
    };
}
