/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
 */

// Extend the Number interface globally to add the `random` method.
declare global {
    interface NumberConstructor {
        random(x: number, y: number): number;
    }
}

// Implement the `random` method on Number.
Number.random = function(x: number, y: number): number {
    if (typeof x !== 'number' || typeof y !== 'number' || x >= y) {
        throw new Error('Invalid input. x and y must be numbers, and x should be less than y.');
    }
    return Math.floor(Math.random() * (y - x + 1)) + x;
};

export {}; // Ensures this file is treated as a module.
