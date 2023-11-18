/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// Get the first and last item.
Array.prototype.first = function() {
    return this[0];
};
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
        if (res != null) {
            return res;
        }
    }
    return null;
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
        if (res != null) {
            return res;
        }
    }
    return null;
};

// Drop an item by the item itself.
Array.prototype.drop = function(item) {
    const dropped = new this.constructor(); // for when a class extends Array.
    for (let i = 0; i < this.length; i++) {    
        if (this[i] != item) {
            dropped.push(this[i])
        }
    }
    return dropped;
};

// Drop an item by index.
Array.prototype.drop_index = function(index) {
    const dropped = new this.constructor(); // for when a class extends Array.
    for (let i = 0; i < this.length; i++) {    
        if (i != index) {
            dropped.push(this[i])
        }
    }
    return dropped;
};

// Drop duplicate items from an array.
Array.prototype.drop_duplicates = function() {
    return this.reduce((accumulator, val) => {
        if (!accumulator.includes(val)) {
            accumulator.push(val);
        }
        return accumulator;
    }, []);
}

// Limit from end, always creates a new array.
Array.prototype.limit_from_end = function(limit) {
    let limited = [];
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
}

// Remove all items that equal the item from the array.
Array.prototype.remove = function(item) {
    let removed = [];
    this.iterate((i) => {
        if (i != item) {
            removed.push(i);
        }
    })
    return removed;
};