/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
 */

// Extend the Array interface globally to add custom methods.
declare global {
    interface Array<T> {
        append(...items: T[]): number;
        first(): T | undefined;
        last(): T | undefined;
        iterate(start?: number | ((item: T) => any), end?: number, handler?: (item: T) => any): any;
        iterate_async(start?: number | ((item: T) => any), end?: number, handler?: (item: T) => Promise<any>): Promise<any>[];
        iterate_async_await(start?: number | ((item: T) => any), end?: number, handler?: (item: T) => Promise<any>): Promise<any>;
        iterate_append(start?: number | ((item: T) => any), end?: number, handler?: (item: T) => T): T[];
        iterate_reversed(start?: number | ((item: T) => any), end?: number, handler?: (item: T) => any): any;
        iterate_reversed_async(start?: number | ((item: T) => any), end?: number, handler?: (item: T) => Promise<any>): Promise<any>[];
        iterate_reversed_async_await(start?: number | ((item: T) => any), end?: number, handler?: (item: T) => Promise<any>): Promise<any>;
        drop(item: T): T[];
        drop_index(index: number): T[];
        drop_duplicates(): T[];
        limit_from_end(limit: number): T[];
        remove(item: T): T[];
        eq(x?: any, y?: any): boolean;
        divide(x: number): T[][];
    }
}

// Append alias for push.
Array.prototype.append = Array.prototype.push;

// Get the first item.
Array.prototype.first = function() {
    return this[0];
};

// Get the last item.
Array.prototype.last = function() {
    return this[this.length - 1];
};

// Iteration function for arrays.
Array.prototype.iterate = function(start, end, handler) {
    if (typeof start === "function") {
        handler = start;
        start = null;
    }
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = this.length;
    }
    for (let i = start; i < end; i++) {    
        const res = handler(this[i]);
        if (res != null && !(res instanceof Promise)) {
            return res;
        }
    }
    return null;
};

Array.prototype.iterate_async = function(start, end, handler) {
    if (typeof start === "function") {
        handler = start;
        start = null;
    }
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = this.length;
    }
    let promises: Promise<any>[] = [];
    for (let i = start; i < end; i++) {    
        const res = handler(this[i]);
        if (res != null && res instanceof Promise) {
            promises.push(res);
        }
    }
    return promises;
};

Array.prototype.iterate_async_await = async function(start, end, handler) {
    if (typeof start === "function") {
        handler = start;
        start = null;
    }
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = this.length;
    }
    for (let i = start; i < end; i++) {    
        const res = handler(this[i]);
        if (res != null && res instanceof Promise) {
            const pres = await res;
            if (pres != null) {
                return pres;
            }
        }
    }
    return null;
};

// Iteration function for arrays to build an array by another array, it appends all the returned callback values into an array and returns that array.
Array.prototype.iterate_append = function(start, end, handler) {
    if (typeof start === "function") {
        handler = start;
        start = null;
    }
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = this.length;
    }
    const items: T[] = [];
    for (let i = start; i < end; i++) {    
        items.append(handler(this[i]));
    }
    return items;
};

// Iterate an array reversed.
Array.prototype.iterate_reversed = function(start, end, handler) {
    if (handler == null && start != null) {
        handler = start;
        start = null;
    }
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = this.length;
    }
    for (let i = end - 1; i >= start; i--) {    
        const res = handler(this[i]);
        if (res != null && !(res instanceof Promise)) {
            return res;
        }
    }
    return null;
};

Array.prototype.iterate_reversed_async = function(start, end, handler) {
    if (handler == null && start != null) {
        handler = start;
        start = null;
    }
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = this.length;
    }
    let promises: Promise<any>[] = [];
    for (let i = end - 1; i >= start; i--) {    
        const res = handler(this[i]);
        if (res != null && res instanceof Promise) {
            promises.push(res);
        }
    }
    return promises;
};

Array.prototype.iterate_reversed_async_await = async function(start, end, handler) {
    if (handler == null && start != null) {
        handler = start;
        start = null;
    }
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = this.length;
    }
    for (let i = end - 1; i >= start; i--) {    
        const res = handler(this[i]);
        if (res != null && res instanceof Promise) {
            const pres = await res;
            if (pres != null) {
                return pres;
            }
        }
    }
    return null;
};

// Drop an item by the item itself.
Array.prototype.drop = function(item) {
    const dropped = new (this.constructor as { new (): T[] })();
    for (let i = 0; i < this.length; i++) {    
        if (this[i] !== item) {
            dropped.push(this[i]);
        }
    }
    return dropped;
};

// Drop an item by index.
Array.prototype.drop_index = function(index) {
    const dropped = new (this.constructor as { new (): T[] })();
    for (let i = 0; i < this.length; i++) {    
        if (i !== index) {
            dropped.push(this[i]);
        }
    }
    return dropped;
};

// Drop duplicate items from an array.
Array.prototype.drop_duplicates = function() {
    return this.reduce<T[]>((accumulator, val) => {
        if (!accumulator.includes(val)) {
            accumulator.push(val);
        }
        return accumulator;
    }, []);
};

// Limit from end, always creates a new array.
Array.prototype.limit_from_end = function(limit) {
    let limited: T[] = [];
    if (this.length > limit) {
        for (let i = this.length - limit; i < this.length; i++) {
            limited.push(this[i]);
        }
    } else {
        for (let i = 0; i < this.length; i++) {
            limited.push(this[i]);
        }
    }
    return limited;
};

// Remove all items that equal the item from the array.
Array.prototype.remove = function(item) {
    let removed: T[] = [];
    this.iterate((i) => {
        if (i !== item) {
            removed.push(i);
        }
    });
    return removed;
};

// Check if an array equals another array.
Array.prototype.eq = function(x = null, y = null) {
    const eq = (x: any, y: any): boolean => {
        if (Array.isArray(x)) {
            if (!Array.isArray(y) || x.length !== y.length) {
                return false;
            }
            for (let i = 0; i < x.length; i++) {
                if (typeof x[i] === "object" || typeof y[i] === "object") {
                    const result = eq(x[i], y[i]);
                    if (!result) {
                        return false;
                    }
                } else if (x[i] !== y[i]) {
                    return false;
                }
            }
            return true;
        } else if (typeof x === "object") {
            if (typeof y !== "object" || Array.isArray(y)) {
                return false;
            }
            const x_keys = Object.keys(x);
            const y_keys = Object.keys(y);
            if (!eq(x_keys, y_keys)) {
                return false;
            }
            for (let i = 0; i < x_keys.length; i++) {
                if (typeof x[x_keys[i]] === "object" || typeof y[y_keys[i]] === "object") {
                    const result = eq(x[x_keys[i]], y[y_keys[i]]);
                    if (!result) {
                        return false;
                    }
                } else if (x[x_keys[i]] !== y[y_keys[i]]) {
                    return false;
                }
            }
            return true;
        } else if (typeof x !== typeof y) {
            return false;
        }
        return x === y;
    };
    if (y == null) {
        y = x;
        x = this;
    }
    return eq(x, y);
};

// Divide into nested arrays.
Array.prototype.divide = function(x) {
    if (typeof x !== 'number' || x <= 0) {
        throw new Error('Number of nested arrays must be a positive number');
    }
    const result: T[][] = [];
    const nested_len = Math.ceil(this.length / x);
    for (let i = 0; i < this.length; i += nested_len) {
        result.push(this.slice(i, i + nested_len));
    }
    return result;
};

export {}; // Ensures this file is treated as a module.
