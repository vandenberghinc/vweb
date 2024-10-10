/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
 */

// Extend the String interface globally to add custom methods.
declare global {
    interface String {
        first(): string | undefined;
        last(): string | undefined;
        first_non_whitespace(line_break?: boolean): string | null;
        last_non_whitespace(line_break?: boolean): string | null;
        first_not_of(exclude?: string[], start_index?: number): string | null;
        first_index_not_of(exclude?: string[], start_index?: number): number | null;
        last_not_of(exclude?: string[], start_index?: number | null): string | null;
        last_index_not_of(exclude?: string[], start_index?: number | null): number | null;
        insert(index: number, substr: string): string;
        remove_indices(start: number, end: number): string;
        replace_indices(substr: string, start: number, end: number): string;
        eq_first(substr: string, start_index?: number): boolean;
        eq_last(substr: string): boolean;
        ensure_last(ensure_last: string): string;
        is_uppercase(allow_digits?: boolean): boolean;
        capitalize_word(): string;
        capitalize_words(): string;
        drop(char: string | string[]): string;
        reverse(): string;
        is_integer_string(): boolean;
        is_floating_string(): boolean;
        is_numeric_string(info?: boolean): boolean | { integer: boolean; floating: boolean };
        unquote(): string;
        quote(): string;
    }

    interface StringConstructor {
        random(length?: number): string;
    }
}

// Implement the String methods.

// Get the first character.
String.prototype.first = function(): string | undefined {
    return this[0];
};

// Get the last character.
String.prototype.last = function(): string | undefined {
    return this[this.length - 1];
};

// Get the first non-whitespace character.
String.prototype.first_non_whitespace = function(line_break: boolean = false): string | null {
    for (let i = 0; i < this.length; i++) {
        const char = this.charAt(i);
        if (char !== " " && char !== "\t" && (!line_break || char !== "\n")) {
            return char;
        }
    }
    return null;
};

// Get the last non-whitespace character.
String.prototype.last_non_whitespace = function(line_break: boolean = false): string | null {
    for (let i = this.length - 1; i >= 0; i--) {
        const char = this.charAt(i);
        if (char !== " " && char !== "\t" && (!line_break || char !== "\n")) {
            return char;
        }
    }
    return null;
};

// Get the first non-excluded character.
String.prototype.first_not_of = function(exclude: string[] = [], start_index: number = 0): string | null {
    for (let i = start_index; i < this.length; i++) {
        if (!exclude.includes(this.charAt(i))) {
            return this.charAt(i);
        }
    }
    return null;
};

// Get the first index of a non-excluded character.
String.prototype.first_index_not_of = function(exclude: string[] = [], start_index: number = 0): number | null {
    for (let i = start_index; i < this.length; i++) {
        if (!exclude.includes(this.charAt(i))) {
            return i;
        }
    }
    return null;
};

// Get the last non-excluded character.
String.prototype.last_not_of = function(exclude: string[] = [], start_index: number | null = null): string | null {
    if (start_index === null) {
        start_index = this.length - 1;
    }
    for (let i = start_index; i >= 0; i--) {
        if (!exclude.includes(this.charAt(i))) {
            return this.charAt(i);
        }
    }
    return null;
};

// Get the last index of a non-excluded character.
String.prototype.last_index_not_of = function(exclude: string[] = [], start_index: number | null = null): number | null {
    if (start_index === null) {
        start_index = this.length - 1;
    }
    for (let i = start_index; i >= 0; i--) {
        if (!exclude.includes(this.charAt(i))) {
            return i;
        }
    }
    return null;
};

// Insert a substring at a specific index.
String.prototype.insert = function(index: number, substr: string): string {
    let edited = this.substr(0, index);
    edited += substr;
    edited += this.substr(index);
    return edited;
};

// Remove a substring between two indices.
String.prototype.remove_indices = function(start: number, end: number): string {
    let edited = this.substr(0, start);
    edited += this.substr(end);
    return edited;
};

// Replace a substring between two indices with another substring.
String.prototype.replace_indices = function(substr: string, start: number, end: number): string {
    let edited = this.substr(0, start);
    edited += substr;
    edited += this.substr(end);
    return edited;
};

// Check if the first characters equal a substring.
String.prototype.eq_first = function(substr: string, start_index: number = 0): boolean {
    if (start_index + substr.length > this.length) {
        return false;
    }
    const end = start_index + substr.length;
    let y = 0;
    for (let x = start_index; x < end; x++) {
        if (this.charAt(x) !== substr.charAt(y)) {
            return false;
        }
        y++;
    }
    return true;
};

// Check if the last characters equal a substring.
String.prototype.eq_last = function(substr: string): boolean {
    if (substr.length > this.length) {
        return false;
    }
    let y = 0;
    for (let x = this.length - substr.length; x < this.length; x++) {
        if (this.charAt(x) !== substr.charAt(y)) {
            return false;
        }
        y++;
    }
    return true;
};

// Ensure the last character is one of the specified characters.
String.prototype.ensure_last = function(ensure_last: string): string {
    if (ensure_last.indexOf(this.charAt(this.length - 1)) === -1) {
        return this + ensure_last.charAt(0);
    }
    return this;
};

// Check if the string is uppercase only.
String.prototype.is_uppercase = function(allow_digits: boolean = false): boolean {
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (allow_digits) {
        uppercase += "0123456789";
    }
    for (let i = 0; i < this.length; i++) {
        if (uppercase.indexOf(this.charAt(i)) === -1) {
            return false;
        }
    }
    return true;
};

// Capitalize the first letter of the word.
String.prototype.capitalize_word = function(): string {
    if ("abcdefghijklmopqrstuvwxyz".includes(this.charAt(0))) {
        return this.charAt(0).toUpperCase() + this.substr(1);
    }
    return this;
};

// Capitalize the first letter of each word separated by whitespace.
String.prototype.capitalize_words = function(): string {
    let batch = "";
    let capitalized = "";
    for (let i = 0; i < this.length; i++) {
        const c = this.charAt(i);
        if (c === " " || c === "\t" || c === "\n") {
            capitalized += batch.capitalize_word();
            batch = "";
            capitalized += c;
        } else {
            batch += c;
        }
    }
    capitalized += batch.capitalize_word();
    return capitalized;
};

// Drop a single character or an array of characters.
String.prototype.drop = function(char: string | string[]): string {
    const is_array = Array.isArray(char);
    let dropped = "";
    for (let i = 0; i < this.length; i++) {
        const c = this.charAt(i);
        if (is_array) {
            if (!char.includes(c)) {
                dropped += c;
            }
        } else {
            if (char !== c) {
                dropped += c;
            }
        }
    }
    return dropped;
};

// Reverse the string.
String.prototype.reverse = function(): string {
    let reversed = "";
    for (let i = this.length - 1; i >= 0; i--) {
        reversed += this.charAt(i);
    }
    return reversed;
};

// Generate a random string.
String.random = function(length: number = 32): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Check if a string is an integer string.
String.prototype.is_integer_string = function(): boolean {
    const chars = '0123456789';
    for (let i = 0; i < this.length; i++) {
        if (chars.indexOf(this.charAt(i)) === -1) {
            return false;
        }
    }
    return true;
};

// Check if a string is a floating string.
String.prototype.is_floating_string = function(): boolean {
    const chars = '0123456789';
    let decimal = false;
    for (let i = 0; i < this.length; i++) {
        const char = this.charAt(i);
        if (char === '.') {
            if (decimal) { return false; }
            decimal = true;
        } else if (chars.indexOf(char) === -1) {
            return false;
        }
    }
    return decimal;
};

// Check if a string is numeric.
String.prototype.is_numeric_string = function(info: boolean = false): boolean | { integer: boolean; floating: boolean } {
    const chars = '0123456789';
    let decimal = false;
    for (let i = 0; i < this.length; i++) {
        const char = this.charAt(i);
        if (char === '.') {
            if (decimal) { return false; }
            decimal = true;
        } else if (chars.indexOf(char) === -1) {
            if (info) {
                return { integer: false, floating: false };
            }
            return false;
        }
    }
    if (info) {
        return { integer: decimal === false, floating: decimal === true };
    }
    return true;
};

// Unquote the string.
String.prototype.unquote = function(): string {
    if ((this.startsWith('"') && this.endsWith('"')) || (this.startsWith("'") && this.endsWith("'"))) {
        return this.slice(1, -1);
    }
    return this;
};

// Quote the string.
String.prototype.quote = function(): string {
    if ((this.startsWith('"') && this.endsWith('"')) || (this.startsWith("'") && this.endsWith("'"))) {
        return this;
    }
    return `"${this}"`;
};

// Implement the random method on String.
String.random = function(length: number = 32): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export {}; // Ensures this file is treated as a module.
