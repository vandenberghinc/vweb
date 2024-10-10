declare global {
    interface Array<T> {

        // Append alias for push.
        append(...items: T[]): number;

        // Get the first item.
        first(): T | undefined;

        // Get the last item.
        last(): T | undefined;

        // Iteration functions
        iterate(handler: (item: T, index: number, array: T[]) => any): any;
        iterate(start: number, handler: (item: T, index: number, array: T[]) => any): any;
        iterate(start: number, end: number, handler: (item: T, index: number, array: T[]) => any): any;

        // Asynchronous iteration functions
        iterate_async(handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any[]>;
        iterate_async(start: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any[]>;
        iterate_async(start: number, end: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any[]>;

        iterate_async_await(handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any>;
        iterate_async_await(start: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any>;
        iterate_async_await(start: number, end: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any>;

        // Iteration function to build an array by appending returned values
        iterate_append(handler: (item: T, index: number, array: T[]) => any): any[];
        iterate_append(start: number, handler: (item: T, index: number, array: T[]) => any): any[];
        iterate_append(start: number, end: number, handler: (item: T, index: number, array: T[]) => any): any[];

        // Reversed iteration functions
        iterate_reversed(handler: (item: T, index: number, array: T[]) => any): any;
        iterate_reversed(start: number, handler: (item: T, index: number, array: T[]) => any): any;
        iterate_reversed(start: number, end: number, handler: (item: T, index: number, array: T[]) => any): any;

        iterate_reversed_async(handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any[]>;
        iterate_reversed_async(start: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any[]>;
        iterate_reversed_async(start: number, end: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any[]>;

        iterate_reversed_async_await(handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any>;
        iterate_reversed_async_await(start: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any>;
        iterate_reversed_async_await(start: number, end: number, handler: (item: T, index: number, array: T[]) => Promise<any>): Promise<any>;

        // Drop methods
        drop(item: T): T[];

        drop_index(index: number): T[];

        // Remove duplicates
        drop_duplicates(): T[];

        // Limit from end
        limit_from_end(limit: number): T[];

        // Remove items equal to the specified item
        remove(item: T): T[];

        // Equality check
        eq(otherArray: any[]): boolean;
        eq(x: any, y: any): boolean;

        // Divide into nested arrays
        divide(x: number): T[][];
    }

    // NumberConstructor extensions
    interface NumberConstructor {
        /**
         * Generates a random integer between x and y, inclusive.
         * @param x The lower bound.
         * @param y The upper bound.
         * @returns A random integer between x and y.
         */
        random(x: number, y: number): number;
    }

    // ObjectConstructor extensions
    interface ObjectConstructor {
        /**
         * Expands object x with properties from object y.
         * Modifies x in place and returns it.
         * @param x The target object to expand.
         * @param y The source object with properties to add to x.
         * @returns The expanded object x.
         */
        expand<T extends object, U extends object>(x: T, y: U): T & U;

        /**
         * Performs a deep equality check between two values.
         * @param x The first value to compare.
         * @param y The second value to compare.
         * @returns True if x and y are deeply equal, false otherwise.
         */
        eq(x: any, y: any): boolean;

        /**
         * Detects changed keys between two objects.
         * @param x The original object.
         * @param y The modified object.
         * @param include_nested Whether to include nested changed keys.
         * @returns An array of changed keys or null if no changes.
         */
        detect_changes(x: any, y: any, include_nested?: boolean): string[] | null;

        /**
         * Renames keys in an object.
         * @param obj The object to rename keys in.
         * @param rename An array of [oldKey, newKey] pairs.
         * @param remove An array of keys to remove from the object.
         * @returns The modified object.
         */
        rename_keys(
            obj: Record<string, any>,
            rename?: [string, string][],
            remove?: string[]
        ): Record<string, any>;

        /**
         * Performs a deep copy of an object.
         * Does not support classes, only primitive objects.
         * @param obj The object to deep copy.
         * @returns A deep copy of the object.
         */
        deep_copy<T>(obj: T): T;

        /**
         * Deletes keys from an object recursively, including nested objects and arrays.
         * @param obj The object to modify.
         * @param remove_keys An array of keys to remove.
         * @returns The modified object.
         */
        delete_recursively<T>(obj: T, remove_keys?: string[]): T;
    }

    // String interface extensions
    interface String {
        /**
         * Returns the first character of the string.
         */
        first(): string | undefined;

        /**
         * Returns the last character of the string.
         */
        last(): string | undefined;

        /**
         * Gets the first non-whitespace character.
         * @param line_break Whether to consider line breaks as whitespace.
         * @returns The first non-whitespace character or null if none found.
         */
        first_non_whitespace(line_break?: boolean): string | null;

        /**
         * Gets the last non-whitespace character.
         * @param line_break Whether to consider line breaks as whitespace.
         * @returns The last non-whitespace character or null if none found.
         */
        last_non_whitespace(line_break?: boolean): string | null;

        /**
         * Finds the first character not in the exclude list.
         * @param exclude An array of characters to exclude.
         * @param start_index The index to start searching from.
         * @returns The first character not excluded or null if none found.
         */
        first_not_of(exclude: string[], start_index?: number): string | null;

        /**
         * Finds the index of the first character not in the exclude list.
         * @param exclude An array of characters to exclude.
         * @param start_index The index to start searching from.
         * @returns The index or null if none found.
         */
        first_index_not_of(exclude: string[], start_index?: number): number | null;

        /**
         * Finds the last character not in the exclude list.
         * @param exclude An array of characters to exclude.
         * @param start_index The index to start searching backwards from.
         * @returns The last character not excluded or null if none found.
         */
        last_not_of(exclude: string[], start_index?: number): string | null;

        /**
         * Finds the index of the last character not in the exclude list.
         * @param exclude An array of characters to exclude.
         * @param start_index The index to start searching backwards from.
         * @returns The index or null if none found.
         */
        last_index_not_of(exclude: string[], start_index?: number): number | null;

        /**
         * Inserts a substring at the specified index.
         * @param index The index to insert at.
         * @param substr The substring to insert.
         * @returns The new string.
         */
        insert(index: number, substr: string): string;

        /**
         * Removes a substring between the specified indices.
         * @param start The starting index.
         * @param end The ending index.
         * @returns The new string.
         */
        remove_indices(start: number, end: number): string;

        /**
         * Replaces a substring between the specified indices with another substring.
         * @param substr The substring to insert.
         * @param start The starting index.
         * @param end The ending index.
         * @returns The new string.
         */
        replace_indices(substr: string, start: number, end: number): string;

        /**
         * Checks if the string starts with a given substring at a specified index.
         * @param substr The substring to check.
         * @param start_index The index to start checking from.
         * @returns True if equal, false otherwise.
         */
        eq_first(substr: string, start_index?: number): boolean;

        /**
         * Checks if the string ends with a given substring.
         * @param substr The substring to check.
         * @returns True if equal, false otherwise.
         */
        eq_last(substr: string): boolean;

        /**
         * Ensures the string ends with one of the specified characters.
         * @param ensure_last A string of characters.
         * @returns The modified string.
         */
        ensure_last(ensure_last: string): string;

        /**
         * Checks if the string is uppercase.
         * @param allow_digits Whether to allow digits as uppercase.
         * @returns True if uppercase, false otherwise.
         */
        is_uppercase(allow_digits?: boolean): boolean;

        /**
         * Capitalizes the first letter of the string.
         * @returns The capitalized string.
         */
        capitalize_word(): string;

        /**
         * Capitalizes the first letter of each word in the string.
         * @returns The string with each word capitalized.
         */
        capitalize_words(): string;

        /**
         * Removes specified characters from the string.
         * @param char A character or array of characters to remove.
         * @returns The modified string.
         */
        drop(char: string | string[]): string;

        /**
         * Reverses the string.
         * @returns The reversed string.
         */
        reverse(): string;

        /**
         * Checks if the string represents an integer.
         * @returns True if it represents an integer, false otherwise.
         */
        is_integer_string(): boolean;

        /**
         * Checks if the string represents a floating-point number.
         * @returns True if it represents a float, false otherwise.
         */
        is_floating_string(): boolean;

        /**
         * Checks if the string is numeric.
         * @param info If true, returns an object with details.
         * @returns True if numeric, false otherwise, or an info object.
         */
        is_numeric_string(info?: boolean): boolean | { integer: boolean; floating: boolean };

        /**
         * Removes surrounding quotes from the string.
         * @returns The unquoted string.
         */
        unquote(): string;

        /**
         * Adds quotes around the string if not already quoted.
         * @returns The quoted string.
         */
        quote(): string;
    }

    // StringConstructor extensions
    interface StringConstructor {
        /**
         * Generates a random alphanumeric string.
         * @param length The length of the string. Default is 32.
         * @returns A random string.
         */
        random(length?: number): string;
    }
}
export {}; // Important: The export {} at the end ensures that this file is treated as a module, which is necessary for augmenting global declarations.
