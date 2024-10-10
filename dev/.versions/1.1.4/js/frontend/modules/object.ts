/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
 */

// Extend the Object interface globally to add custom methods.
declare global {
    interface ObjectConstructor {
        expand(x: object, y: object): object;
        eq(x: any, y: any): boolean;
        detect_changes(x: any, y: any, include_nested?: boolean): any;
        rename_keys(obj?: object, rename?: [string, string][], remove?: string[]): object;
        deep_copy(obj: any): any;
        delete_recursively(obj: object, remove_keys?: string[]): object;
    }
}

// Internal function to check equals.
const obj_eq = function(x: any, y: any, detect_keys = false, detect_keys_nested = false): any {
    if (typeof x !== typeof y) { return false; }
    else if (x instanceof String) {
        return x.toString() === y.toString();
    }
    else if (Array.isArray(x)) {
        if (!Array.isArray(y) || x.length !== y.length) { return false; }
        for (let i = 0; i < x.length; i++) {
            if (!obj_eq(x[i], y[i])) {
                return false;
            }
        }
        return true;
    }
    else if (x != null && typeof x === "object") {
        const changes: string[] = [];
        const x_keys = Object.keys(x);
        const y_keys = Object.keys(y);
        if (x_keys.length !== y_keys.length) {
            return false;
        }
        for (const key of x_keys) {
            if (!y.hasOwnProperty(key)) {
                const result = obj_eq(x[key], y[key], detect_keys, detect_keys_nested);
                if (detect_keys) {
                    if (result === true) {
                        changes.push(key);
                    }
                    else if (result !== false && Array.isArray(result)) {
                        changes.push(key);
                        if (detect_keys_nested && Array.isArray(result)) {
                            changes.push(...result);
                        }
                    }
                } else if (!result) {
                    return false;
                }
            }
        }
        if (detect_keys) {
            return changes.length === 0 ? null : changes;
        }
        return true;
    }
    else {
        return x === y;
    }
};

// Perform a deep copy on any type, except it does not support classes, only primitive objects.
const deep_copy = (obj: any): any => {
    if (Array.isArray(obj)) {
        const copy: any[] = [];
        obj.iterate((item: any) => {
            copy.append(deep_copy(item));
        });
        return copy;
    }
    else if (obj !== null && obj instanceof String) {
        return new String(obj.toString());
    }
    else if (obj !== null && typeof obj === "object") {
        const copy: { [key: string]: any } = {};
        const keys = Object.keys(obj);
        const values = Object.values(obj);
        for (let i = 0; i < keys.length; i++) {
            copy[keys[i]] = deep_copy(values[i]);
        }
        return copy;
    }
    else {
        return obj;
    }
};

// Expand object x with object y, does not create a copy and returns nothing.
Object.expand = function(x: object, y: object): object {
    const keys = Object.keys(y);
    for (let i = 0; i < keys.length; i++) {
        (x as any)[keys[i]] = (y as any)[keys[i]];
    }
    return x;
};

// Check if an object equals another object.
// Causes UB with actual classes.
Object.eq = function(x: any, y: any): boolean {
    return obj_eq(x, y);
};

// Detect changed keys between two objects, optionally include the changed nested object keys.
// Returns `null` when no keys have changed.
// Causes undefined behaviour when one of the x, y parameters is not an object.
Object.detect_changes = function(x: any, y: any, include_nested: boolean = false): any {
    return obj_eq(x, y, true, include_nested);
};

// Rename object keys.
Object.rename_keys = function(obj: object = {}, rename: [string, string][] = [["old", "new"]], remove: string[] = []): object {
    remove.forEach((key) => {
        delete (obj as any)[key];
    });
    rename.forEach(([oldKey, newKey]) => {
        (obj as any)[newKey] = (obj as any)[oldKey];
        delete (obj as any)[oldKey];
    });
    return obj;
};

// Perform a deep copy on any type, except it does not support classes, only primitive objects.
/*  @docs:
    @nav: Frontend
    @chapter: Utils
    @title: Deep copy
    @desc: Perform a deep copy on any type, it does not support classes, only primitive objects.
 */
Object.deep_copy = function(obj: any): any {
    return deep_copy(obj);
};

// Delete keys from an object recursively, so also from the nested objects and from the nested objects nested within nested arrays.
Object.delete_recursively = function(obj: object, remove_keys: string[] = []): object {
    const clean = (obj: any) => {
        if (Array.isArray(obj)) {
            obj.iterate((item: any) => {
                if (Array.isArray(item) || (typeof item === "object" && item != null)) {
                    clean(item);
                }
            });
        } else {
            Object.keys(obj).iterate((key: string) => {
                if (remove_keys.includes(key)) {
                    delete obj[key];
                }
                else if (Array.isArray(obj[key]) || (typeof obj[key] === "object" && obj[key] != null)) {
                    clean(obj[key]);
                }
            });
        }
    };
    clean(obj);
    return obj;
};

export {}; // Ensures this file is treated as a module.
