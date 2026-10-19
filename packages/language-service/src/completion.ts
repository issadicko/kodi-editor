import type { languages } from 'monaco-editor';

/**
 * KodiScript native functions with their documentation.
 *
 * Mirrors the reference interpreter (kodi-go): the natives registry plus the
 * interpreter builtins (print, map, filter, groupBy…). Hosts also read it as
 * the list of known names: a missing function is reported as undefined, a
 * fictitious one is offered and accepted.
 */
export const NATIVE_FUNCTIONS = [
    // String functions
    {
        name: 'toString',
        signature: 'toString(value: any): string',
        description: 'Converts any value to its string representation.',
        example: 'toString(42)',
    },
    {
        name: 'toNumber',
        signature: 'toNumber(value: string | number): number',
        description: 'Converts a string or a number to a number; fails on text that is not a number.',
        example: 'toNumber("42")',
    },
    {
        name: 'length',
        signature: 'length(str: string): number',
        description: 'Returns the length of a string. For an array or an object, use size.',
        example: 'length("Hello")',
    },
    {
        name: 'substring',
        signature: 'substring(str: string, start: number, end?: number): string',
        description: 'Extracts the part of a string from start up to end (excluded), or to its end.',
        example: 'substring("Hello", 0, 3)',
    },
    {
        name: 'toUpperCase',
        signature: 'toUpperCase(str: string): string',
        description: 'Converts a string to uppercase.',
        example: 'toUpperCase("hello")',
    },
    {
        name: 'toLowerCase',
        signature: 'toLowerCase(str: string): string',
        description: 'Converts a string to lowercase.',
        example: 'toLowerCase("HELLO")',
    },
    {
        name: 'trim',
        signature: 'trim(str: string): string',
        description: 'Removes whitespace from both ends of a string.',
        example: 'trim("  hello  ")',
    },
    {
        name: 'split',
        signature: 'split(str: string, separator: string): array',
        description: 'Splits a string into an array around a separator.',
        example: 'split("a,b,c", ",")',
    },
    {
        name: 'join',
        signature: 'join(arr: array, separator: string): string',
        description: 'Joins array elements into a string with a separator.',
        example: 'join(["a", "b", "c"], ",")',
    },
    {
        name: 'replace',
        signature: 'replace(str: string, search: string, replacement: string): string',
        description: 'Replaces every occurrence of a substring.',
        example: 'replace("a-b-c", "-", "/")',
    },
    {
        name: 'contains',
        signature: 'contains(str: string, substr: string): boolean',
        description: 'Checks if a string contains a substring. For an array, use has.',
        example: 'contains("Hello", "ell")',
    },
    {
        name: 'startsWith',
        signature: 'startsWith(str: string, prefix: string): boolean',
        description: 'Checks if a string starts with a prefix.',
        example: 'startsWith("order-123", "order")',
    },
    {
        name: 'endsWith',
        signature: 'endsWith(str: string, suffix: string): boolean',
        description: 'Checks if a string ends with a suffix.',
        example: 'endsWith("report.pdf", ".pdf")',
    },
    {
        name: 'indexOf',
        signature: 'indexOf(str: string, substr: string): number',
        description: 'Returns the index of the first occurrence of a substring, or -1.',
        example: 'indexOf("hello", "l")',
    },
    {
        name: 'repeat',
        signature: 'repeat(str: string, count: number): string',
        description: 'Repeats a string count times.',
        example: 'repeat("ab", 3)',
    },
    {
        name: 'padLeft',
        signature: 'padLeft(str: string, length: number, pad?: string): string',
        description: 'Pads the start of a string up to length characters, with spaces or the first character of pad.',
        example: 'padLeft("7", 3, "0")',
    },
    {
        name: 'padRight',
        signature: 'padRight(str: string, length: number, pad?: string): string',
        description: 'Pads the end of a string up to length characters, with spaces or the first character of pad.',
        example: 'padRight("7", 3, "0")',
    },

    // Math functions
    {
        name: 'abs',
        signature: 'abs(n: number): number',
        description: 'Returns the absolute value of a number.',
        example: 'abs(-42)',
    },
    {
        name: 'floor',
        signature: 'floor(n: number): number',
        description: 'Rounds a number down to the nearest integer.',
        example: 'floor(3.7)',
    },
    {
        name: 'ceil',
        signature: 'ceil(n: number): number',
        description: 'Rounds a number up to the nearest integer.',
        example: 'ceil(3.2)',
    },
    {
        name: 'round',
        signature: 'round(n: number): number',
        description: 'Rounds a number to the nearest integer.',
        example: 'round(3.5)',
    },
    {
        name: 'min',
        signature: 'min(a: number, b: number, ...more: number[]): number',
        description: 'Returns the smallest of two or more numbers.',
        example: 'min(5, 3, 8)',
    },
    {
        name: 'max',
        signature: 'max(a: number, b: number, ...more: number[]): number',
        description: 'Returns the largest of two or more numbers.',
        example: 'max(5, 3, 8)',
    },
    {
        name: 'pow',
        signature: 'pow(base: number, exponent: number): number',
        description: 'Returns base raised to the power of exponent.',
        example: 'pow(2, 8)',
    },
    {
        name: 'sqrt',
        signature: 'sqrt(n: number): number',
        description: 'Returns the square root of a number; fails on a negative number.',
        example: 'sqrt(16)',
    },
    {
        name: 'sin',
        signature: 'sin(radians: number): number',
        description: 'Returns the sine of an angle in radians.',
        example: 'sin(0)',
    },
    {
        name: 'cos',
        signature: 'cos(radians: number): number',
        description: 'Returns the cosine of an angle in radians.',
        example: 'cos(0)',
    },
    {
        name: 'tan',
        signature: 'tan(radians: number): number',
        description: 'Returns the tangent of an angle in radians.',
        example: 'tan(0)',
    },
    {
        name: 'log',
        signature: 'log(n: number): number',
        description: 'Returns the natural logarithm of a positive number.',
        example: 'log(10)',
    },
    {
        name: 'log10',
        signature: 'log10(n: number): number',
        description: 'Returns the base-10 logarithm of a positive number.',
        example: 'log10(1000)',
    },
    {
        name: 'exp',
        signature: 'exp(n: number): number',
        description: 'Returns e raised to the power of n.',
        example: 'exp(1)',
    },

    // Random functions
    {
        name: 'random',
        signature: 'random(): number',
        description: 'Returns a random number from 0 (included) to 1 (excluded).',
        example: 'random()',
    },
    {
        name: 'randomInt',
        signature: 'randomInt(min: number, max: number): number',
        description: 'Returns a random integer from min to max, both included; min must be less than max.',
        example: 'randomInt(1, 100)',
    },
    {
        name: 'randomUUID',
        signature: 'randomUUID(): string',
        description: 'Returns a random UUID v4.',
        example: 'randomUUID()',
    },

    // Type functions
    {
        name: 'typeOf',
        signature: 'typeOf(value: any): string',
        description: 'Returns the type of a value: "null", "string", "number", "boolean", "array" or "object".',
        example: 'typeOf(42)',
    },
    {
        name: 'isNull',
        signature: 'isNull(value: any): boolean',
        description: 'Checks if a value is null.',
        example: 'isNull(null)',
    },
    {
        name: 'isNumber',
        signature: 'isNumber(value: any): boolean',
        description: 'Checks if a value is a number.',
        example: 'isNumber(3.14)',
    },
    {
        name: 'isString',
        signature: 'isString(value: any): boolean',
        description: 'Checks if a value is a string.',
        example: 'isString("hello")',
    },
    {
        name: 'isBool',
        signature: 'isBool(value: any): boolean',
        description: 'Checks if a value is a boolean.',
        example: 'isBool(true)',
    },

    // Array functions
    {
        name: 'size',
        signature: 'size(value: array | string | object): number',
        description: 'Returns the number of elements of an array, characters of a string, or keys of an object.',
        example: 'size([1, 2, 3])',
    },
    {
        name: 'first',
        signature: 'first(arr: array): any',
        description: 'Returns the first element of an array, or null if it is empty.',
        example: 'first([3, 1, 2])',
    },
    {
        name: 'last',
        signature: 'last(arr: array): any',
        description: 'Returns the last element of an array, or null if it is empty.',
        example: 'last([3, 1, 2])',
    },
    {
        name: 'reverse',
        signature: 'reverse(arr: array): array',
        description: 'Returns a reversed copy of an array.',
        example: 'reverse([1, 2, 3])',
    },
    {
        name: 'slice',
        signature: 'slice(arr: array, start: number, end?: number): array',
        description: 'Returns the elements from start up to end (excluded), or to the end of the array.',
        example: 'slice([1, 2, 3, 4], 1, 3)',
    },
    {
        name: 'sort',
        signature: 'sort(arr: array, order?: "asc" | "desc"): array',
        description: 'Returns a sorted copy of an array: numbers by value, other values by text. Ascending by default.',
        example: 'sort([3, 1, 2], "desc")',
    },
    {
        name: 'sortBy',
        signature: 'sortBy(arr: array, field: string, order?: "asc" | "desc"): array',
        description: 'Returns a copy of an array of objects sorted on a field. Ascending by default.',
        example: 'sortBy([{"age": 30}, {"age": 20}], "age")',
    },

    // Functional helpers: fn receives the element and its index
    {
        name: 'map',
        signature: 'map(arr: array, fn: fn(item, index)): array',
        description: 'Returns a new array holding the result of fn for each element.',
        example: 'map([1, 2, 3], fn(x) { x * 2 })',
    },
    {
        name: 'filter',
        signature: 'filter(arr: array, fn: fn(item, index)): array',
        description: 'Keeps the elements for which fn returns a truthy value.',
        example: 'filter([1, 2, 3, 4], fn(x) { x % 2 == 0 })',
    },
    {
        name: 'reduce',
        signature: 'reduce(arr: array, fn: fn(acc, item, index), initial: any): any',
        description: 'Folds an array into a single value, starting from initial.',
        example: 'reduce([1, 2, 3], fn(acc, x) { acc + x }, 0)',
    },
    {
        name: 'find',
        signature: 'find(arr: array, fn: fn(item, index)): any',
        description: 'Returns the first element for which fn returns a truthy value, or null.',
        example: 'find([1, 5, 8], fn(x) { x > 3 })',
    },
    {
        name: 'findIndex',
        signature: 'findIndex(arr: array, fn: fn(item, index)): number',
        description: 'Returns the index of the first element for which fn returns a truthy value, or -1.',
        example: 'findIndex([1, 5, 8], fn(x) { x > 3 })',
    },
    {
        name: 'some',
        signature: 'some(arr: array, fn: fn(item, index)): boolean',
        description: 'Checks if fn returns a truthy value for at least one element.',
        example: 'some([1, 5, 8], fn(x) { x > 6 })',
    },
    {
        name: 'every',
        signature: 'every(arr: array, fn: fn(item, index)): boolean',
        description: 'Checks if fn returns a truthy value for every element.',
        example: 'every([1, 5, 8], fn(x) { x > 0 })',
    },
    {
        name: 'flatMap',
        signature: 'flatMap(arr: array, fn: fn(item, index)): array',
        description: 'Maps each element to an array, then flattens the result one level.',
        example: 'flatMap([1, 2], fn(x) { [x, x * 10] })',
    },

    // Grouping and aggregation: the key is a dotted path or fn(item, index); a null array is empty
    {
        name: 'groupBy',
        signature: 'groupBy(arr: array, key: string | fn(item, index)): object',
        description: 'Groups the elements by key: {key: [elements]}, in array order. The key is a dotted path or a function.',
        example: 'groupBy([{"r": "N"}, {"r": "S"}, {"r": "N"}], "r")',
    },
    {
        name: 'countBy',
        signature: 'countBy(arr: array, key: string | fn(item, index)): object',
        description: 'Counts the elements by key: {key: count}. The key is a dotted path or a function.',
        example: 'countBy([{"r": "N"}, {"r": "S"}, {"r": "N"}], "r")',
    },
    {
        name: 'indexBy',
        signature: 'indexBy(arr: array, key: string | fn(item, index)): object',
        description: 'Indexes the elements by key: {key: element}; the last element of a key wins.',
        example: 'indexBy([{"id": "a", "n": 1}, {"id": "b", "n": 2}], "id")',
    },
    {
        name: 'uniqueBy',
        signature: 'uniqueBy(arr: array, key: string | fn(item, index)): array',
        description: 'Keeps the first element for each distinct key.',
        example: 'uniqueBy([{"r": "N", "n": 1}, {"r": "N", "n": 2}], "r")',
    },
    {
        name: 'sumBy',
        signature: 'sumBy(arr: array, key: string | fn(item, index)): number',
        description: 'Sums the key of each element; null keys are skipped.',
        example: 'sumBy([{"amount": 500}, {"amount": 1500}], "amount")',
    },
    {
        name: 'minBy',
        signature: 'minBy(arr: array, key: string | fn(item, index)): any',
        description: 'Returns the element with the smallest key, or null.',
        example: 'minBy([{"amount": 500}, {"amount": 1500}], "amount")',
    },
    {
        name: 'maxBy',
        signature: 'maxBy(arr: array, key: string | fn(item, index)): any',
        description: 'Returns the element with the largest key, or null.',
        example: 'maxBy([{"amount": 500}, {"amount": 1500}], "amount")',
    },
    {
        name: 'partition',
        signature: 'partition(arr: array, key: string | fn(item, index)): array',
        description: 'Splits the elements in two: [[elements whose key is truthy], [the others]].',
        example: 'partition([1, 2, 3, 4], fn(x) { x > 2 })',
    },

    // Collection utilities: a null array behaves as an empty array
    {
        name: 'range',
        signature: 'range(start: number, end?: number): array',
        description: 'range(n) gives the integers from 0 to n - 1; range(start, end) those from start up to end (excluded).',
        example: 'range(2, 5)',
    },
    {
        name: 'sum',
        signature: 'sum(arr: number[]): number',
        description: 'Returns the sum of an array of numbers.',
        example: 'sum([1, 2, 3])',
    },
    {
        name: 'avg',
        signature: 'avg(arr: number[]): number',
        description: 'Returns the average of an array of numbers, 0 if it is empty.',
        example: 'avg([1, 2, 3])',
    },
    {
        name: 'unique',
        signature: 'unique(arr: array): array',
        description: 'Removes duplicate values, keeping the first occurrence.',
        example: 'unique([1, 1, 2, 3, 3])',
    },
    {
        name: 'flatten',
        signature: 'flatten(arr: array): array',
        description: 'Flattens nested arrays one level deep.',
        example: 'flatten([[1, 2], [3, 4]])',
    },
    {
        name: 'push',
        signature: 'push(arr: array, ...items: any[]): array',
        description: 'Returns a new array with the items appended; the original array is unchanged.',
        example: 'push([1, 2], 3)',
    },
    {
        name: 'concat',
        signature: 'concat(...arrays: array[]): array',
        description: 'Concatenates arrays into a new array.',
        example: 'concat([1, 2], [3, 4])',
    },
    {
        name: 'chunk',
        signature: 'chunk(arr: array, size: number): array',
        description: 'Splits an array into consecutive arrays of size elements.',
        example: 'chunk([1, 2, 3, 4, 5], 2)',
    },
    {
        name: 'compact',
        signature: 'compact(arr: array): array',
        description: 'Removes the null elements of an array.',
        example: 'compact([1, null, 2])',
    },
    {
        name: 'pluck',
        signature: 'pluck(arr: array, path: string): array',
        description: 'Returns the value at a dotted path for each element.',
        example: 'pluck([{"c": {"n": "a"}}, {"c": {"n": "b"}}], "c.n")',
    },
    {
        name: 'zip',
        signature: 'zip(...arrays: array[]): array',
        description: 'Pairs arrays element by element: [[a0, b0], [a1, b1], …], as long as the shortest array.',
        example: 'zip([1, 2], ["a", "b"])',
    },
    {
        name: 'fromEntries',
        signature: 'fromEntries(pairs: array): object',
        description: 'Builds an object from [key, value] pairs, the inverse of entries.',
        example: 'fromEntries([["x", 1], ["y", 2]])',
    },
    {
        name: 'difference',
        signature: 'difference(a: array, b: array): array',
        description: 'Returns the elements of a that are not in b. 1 equals 1.0 but not "1".',
        example: 'difference([1, 2, 3], [2])',
    },
    {
        name: 'intersection',
        signature: 'intersection(a: array, b: array): array',
        description: 'Returns the elements of a that are also in b, without duplicates. 1 equals 1.0 but not "1".',
        example: 'intersection([1, 2, 3], [3, 1])',
    },
    {
        name: 'union',
        signature: 'union(...arrays: array[]): array',
        description: 'Returns every element once, in order of appearance. 1 equals 1.0 but not "1".',
        example: 'union([1, 2], [2, 3])',
    },

    // Object functions
    {
        name: 'keys',
        signature: 'keys(obj: object): array',
        description: 'Returns the keys of an object, sorted alphabetically.',
        example: 'keys({"b": 2, "a": 1})',
    },
    {
        name: 'values',
        signature: 'values(obj: object): array',
        description: 'Returns the values of an object, ordered by sorted key.',
        example: 'values({"b": 2, "a": 1})',
    },
    {
        name: 'entries',
        signature: 'entries(obj: object): array',
        description: 'Returns the [key, value] pairs of an object, ordered by sorted key.',
        example: 'entries({"b": 2, "a": 1})',
    },
    {
        name: 'has',
        signature: 'has(collection: object | array, item: any): boolean',
        description: 'Checks if an object has a key, or if an array contains a value.',
        example: 'has({"a": 1}, "a")',
    },

    // Parsing functions
    {
        name: 'parseInt',
        signature: 'parseInt(value: string | number): number',
        description: 'Parses a value into an integer, dropping the decimals.',
        example: 'parseInt("3.9")',
    },
    {
        name: 'parseFloat',
        signature: 'parseFloat(value: string | number): number',
        description: 'Parses a value into a decimal number.',
        example: 'parseFloat("3.14")',
    },

    // Regex functions
    {
        name: 'regexMatch',
        signature: 'regexMatch(str: string, pattern: string): boolean',
        description: 'Checks if a regular expression matches anywhere in a string.',
        example: 'regexMatch("order-123", "[0-9]+")',
    },
    {
        name: 'regexReplace',
        signature: 'regexReplace(str: string, pattern: string, replacement: string): string',
        description: 'Replaces every match of a regular expression.',
        example: 'regexReplace("a1b2c3", "[0-9]", "#")',
    },

    // JSON functions
    {
        name: 'jsonParse',
        signature: 'jsonParse(str: string): any',
        description: 'Parses a JSON string into a value.',
        example: 'jsonParse(\'{"name": "Alice"}\')',
    },
    {
        name: 'jsonStringify',
        signature: 'jsonStringify(value: any): string',
        description: 'Converts a value to a JSON string.',
        example: 'jsonStringify({"a": 1})',
    },

    // Encoding functions
    {
        name: 'base64Encode',
        signature: 'base64Encode(str: string): string',
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
        signature: 'urlEncode(str: string): string',
        description: 'Percent-encodes a string for a URL; a space becomes %20.',
        example: 'urlEncode("hello world")',
    },
    {
        name: 'urlDecode',
        signature: 'urlDecode(encoded: string): string',
        description: 'Decodes a percent-encoded string.',
        example: 'urlDecode("hello%20world")',
    },

    // Date/time functions: a date is milliseconds since 1970-01-01 UTC or ISO-8601 text,
    // computed in UTC; a date that cannot be read gives null
    {
        name: 'now',
        signature: 'now(): number',
        description: 'Returns the current time in milliseconds since 1970-01-01 UTC.',
        example: 'now()',
    },
    {
        name: 'date',
        signature: 'date(): string',
        description: 'Returns the current UTC date as YYYY-MM-DD.',
        example: 'date()',
    },
    {
        name: 'time',
        signature: 'time(): string',
        description: 'Returns the current UTC time as HH:mm:ss.',
        example: 'time()',
    },
    {
        name: 'datetime',
        signature: 'datetime(): string',
        description: 'Returns the current time as YYYY-MM-DDTHH:mm:ss.SSSZ.',
        example: 'datetime()',
    },
    {
        name: 'timestamp',
        signature: 'timestamp(date?: number | string): number',
        description: 'Returns a date in milliseconds, or now without argument. A date is milliseconds or ISO-8601 text.',
        example: 'timestamp("2026-10-19T08:30:00Z")',
    },
    {
        name: 'isDate',
        signature: 'isDate(value: any): boolean',
        description: 'Checks if a value reads as a date: milliseconds or valid ISO-8601 text.',
        example: 'isDate("2026-02-29")',
    },
    {
        name: 'parseDate',
        signature: 'parseDate(text: string, format: string): number',
        description: 'Reads text with a format (YYYY, MM, DD, HH, mm, ss, SSS) into milliseconds; null if it does not match.',
        example: 'parseDate("19/10/2026", "DD/MM/YYYY")',
    },
    {
        name: 'toISO',
        signature: 'toISO(date: number | string): string',
        description: 'Returns a date as YYYY-MM-DDTHH:mm:ss.SSSZ.',
        example: 'toISO(0)',
    },
    {
        name: 'formatDate',
        signature: 'formatDate(date: number | string, format?: string): string',
        description: 'Formats a date with the tokens YYYY, YY, MM, DD, HH, mm, ss, SSS; YYYY-MM-DD by default.',
        example: 'formatDate("2026-10-19T08:05:00Z", "DD/MM/YYYY HH:mm")',
    },
    {
        name: 'year',
        signature: 'year(date?: number | string): number',
        description: 'Returns the year of a date, or of now without argument.',
        example: 'year("2026-10-19")',
    },
    {
        name: 'month',
        signature: 'month(date?: number | string): number',
        description: 'Returns the month (1-12) of a date, or of now without argument.',
        example: 'month("2026-10-19")',
    },
    {
        name: 'day',
        signature: 'day(date?: number | string): number',
        description: 'Returns the day of the month of a date, or of now without argument.',
        example: 'day("2026-10-19")',
    },
    {
        name: 'hour',
        signature: 'hour(date?: number | string): number',
        description: 'Returns the hour (0-23) of a date, or of now without argument.',
        example: 'hour("2026-10-19T08:30:00Z")',
    },
    {
        name: 'minute',
        signature: 'minute(date?: number | string): number',
        description: 'Returns the minutes of a date, or of now without argument.',
        example: 'minute("2026-10-19T08:30:00Z")',
    },
    {
        name: 'second',
        signature: 'second(date?: number | string): number',
        description: 'Returns the seconds of a date, or of now without argument.',
        example: 'second("2026-10-19T08:30:15Z")',
    },
    {
        name: 'dayOfWeek',
        signature: 'dayOfWeek(date?: number | string): number',
        description: 'Returns the day of the week (0 = Sunday … 6 = Saturday) of a date, or of now without argument.',
        example: 'dayOfWeek("2026-10-19")',
    },
    {
        name: 'daysInMonth',
        signature: 'daysInMonth(date: number | string): number',
        description: 'Returns the number of days in the month of a date.',
        example: 'daysInMonth("2024-02-10")',
    },
    {
        name: 'isWeekend',
        signature: 'isWeekend(date: number | string): boolean',
        description: 'Checks if a date falls on a Saturday or a Sunday.',
        example: 'isWeekend("2026-10-18")',
    },
    {
        name: 'addDays',
        signature: 'addDays(date: number | string, n: number): number',
        description: 'Returns the date shifted by n days, in milliseconds.',
        example: 'addDays("2026-10-19", 7)',
    },
    {
        name: 'addHours',
        signature: 'addHours(date: number | string, n: number): number',
        description: 'Returns the date shifted by n hours, in milliseconds.',
        example: 'addHours("2026-10-19T08:00:00Z", 2)',
    },
    {
        name: 'addMinutes',
        signature: 'addMinutes(date: number | string, n: number): number',
        description: 'Returns the date shifted by n minutes, in milliseconds.',
        example: 'addMinutes("2026-10-19T08:00:00Z", 30)',
    },
    {
        name: 'addSeconds',
        signature: 'addSeconds(date: number | string, n: number): number',
        description: 'Returns the date shifted by n seconds, in milliseconds.',
        example: 'addSeconds("2026-10-19T08:00:00Z", 45)',
    },
    {
        name: 'addMonths',
        signature: 'addMonths(date: number | string, n: number): number',
        description: 'Returns the date shifted by n calendar months, in milliseconds; a day missing in the target month becomes its last day.',
        example: 'addMonths("2026-01-31", 1)',
    },
    {
        name: 'addYears',
        signature: 'addYears(date: number | string, n: number): number',
        description: 'Returns the date shifted by n years, in milliseconds; 29 February becomes 28 February in a common year.',
        example: 'addYears("2024-02-29", 1)',
    },
    {
        name: 'diffDays',
        signature: 'diffDays(a: number | string, b: number | string): number',
        description: 'Returns the whole days from a to b, negative when b is earlier.',
        example: 'diffDays("2026-10-19", "2026-10-26")',
    },
    {
        name: 'diffHours',
        signature: 'diffHours(a: number | string, b: number | string): number',
        description: 'Returns the whole hours from a to b, negative when b is earlier.',
        example: 'diffHours("2026-10-19T08:00:00Z", "2026-10-19T17:30:00Z")',
    },
    {
        name: 'diffMinutes',
        signature: 'diffMinutes(a: number | string, b: number | string): number',
        description: 'Returns the whole minutes from a to b, negative when b is earlier.',
        example: 'diffMinutes("2026-10-19T08:00:00Z", "2026-10-19T08:45:00Z")',
    },
    {
        name: 'diffMonths',
        signature: 'diffMonths(a: number | string, b: number | string): number',
        description: 'Returns the whole calendar months from a to b, negative when b is earlier.',
        example: 'diffMonths("2026-01-31", "2026-03-01")',
    },
    {
        name: 'diffYears',
        signature: 'diffYears(a: number | string, b: number | string): number',
        description: 'Returns the whole calendar years from a to b, negative when b is earlier.',
        example: 'diffYears("2020-10-20", "2026-10-19")',
    },
    {
        name: 'age',
        signature: 'age(birth: number | string, at?: number | string): number',
        description: 'Returns the whole years from birth to at, or to now without second argument.',
        example: 'age("2000-10-20", "2026-10-19")',
    },
    {
        name: 'startOfDay',
        signature: 'startOfDay(date: number | string): number',
        description: 'Returns the day of a date at 00:00:00.000, in milliseconds.',
        example: 'startOfDay("2026-10-19T08:30:00Z")',
    },
    {
        name: 'endOfDay',
        signature: 'endOfDay(date: number | string): number',
        description: 'Returns the day of a date at 23:59:59.999, in milliseconds.',
        example: 'endOfDay("2026-10-19T08:30:00Z")',
    },
    {
        name: 'startOfMonth',
        signature: 'startOfMonth(date: number | string): number',
        description: 'Returns the first day of the month of a date at 00:00:00.000, in milliseconds.',
        example: 'startOfMonth("2026-10-19")',
    },
    {
        name: 'endOfMonth',
        signature: 'endOfMonth(date: number | string): number',
        description: 'Returns the last day of the month of a date at 23:59:59.999, in milliseconds.',
        example: 'endOfMonth("2024-02-10")',
    },

    // Crypto/hash functions
    {
        name: 'md5',
        signature: 'md5(str: string): string',
        description: 'Returns the MD5 hash of a string, in hexadecimal.',
        example: 'md5("hello")',
    },
    {
        name: 'sha1',
        signature: 'sha1(str: string): string',
        description: 'Returns the SHA-1 hash of a string, in hexadecimal.',
        example: 'sha1("hello")',
    },
    {
        name: 'sha256',
        signature: 'sha256(str: string): string',
        description: 'Returns the SHA-256 hash of a string, in hexadecimal.',
        example: 'sha256("hello")',
    },

    // Output
    {
        name: 'print',
        signature: 'print(...values: any[]): null',
        description: 'Writes each value to the script output, which the host reads after execution.',
        example: 'print("total:", 42)',
    },
];

/**
 * KodiScript keywords for completion: the reserved words of the reference lexer
 * (kodi-go). Logical operators are symbols (&&, ||, !), not words.
 */
export const KEYWORDS = [
    { name: 'let', description: 'Declare a variable' },
    { name: 'if', description: 'Conditional statement' },
    { name: 'else', description: 'Alternative branch for if statement' },
    { name: 'return', description: 'Return a value from a function or the script' },
    { name: 'true', description: 'Boolean true literal' },
    { name: 'false', description: 'Boolean false literal' },
    { name: 'null', description: 'Null value literal' },
    { name: 'fn', description: 'Define a function: fn(params) { } or fn name(params) { }' },
    { name: 'for', description: 'For-in loop statement' },
    { name: 'in', description: 'Iterate over the elements of an array' },
    { name: 'while', description: 'While loop statement' },
    { name: 'break', description: 'Exit the enclosing loop' },
    { name: 'continue', description: 'Skip to the next iteration of the enclosing loop' },
    { name: 'try', description: 'Run a block and catch its runtime errors' },
    { name: 'catch', description: 'Handle the error of a try block; catch (e) binds its message' },
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
        documentation: 'Iterate over the elements of an array',
        insertText: 'for (${1:item} in ${2:collection}) {\n\t$0\n}',
    },
    {
        label: 'while',
        detail: 'While loop',
        documentation: 'Execute block while condition is true',
        insertText: 'while (${1:condition}) {\n\t$0\n}',
    },
    {
        label: 'try',
        detail: 'Try-catch statement',
        documentation: 'Run a block and handle its runtime error; e holds the error message',
        insertText: 'try {\n\t${1:// body}\n} catch (${2:e}) {\n\t${3:// handle the error}\n}',
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
        insertText: 'jsonStringify(${1:value})',
    },
    {
        label: 'parsejson',
        detail: 'Parse JSON',
        documentation: 'Parse JSON string to object',
        insertText: 'jsonParse(${1:jsonString})',
    },
    {
        label: 'nullcheck',
        detail: 'Null check pattern',
        documentation: 'Default value when the left side is null',
        insertText: '${1:value} ?: ${2:defaultValue}',
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
