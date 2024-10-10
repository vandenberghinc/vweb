/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2024 Daan van den Bergh.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Imports.
import { Elements } from "../modules/elements";
// ---------------------------------------------------------
// Mutex class.
export class MutexElement {
    constructor() {
        this.locked = false;
        this.queue = [];
    }
    // Lock the mutex.
    // Should be awaited.
    lock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.locked) {
                this.locked = true;
                return Promise.resolve();
            }
            else {
                return new Promise((resolve) => {
                    this.queue.push(resolve);
                });
            }
        });
    }
    // Unlock the mutex.
    unlock() {
        if (this.queue.length > 0) {
            const nextResolve = this.queue.shift();
            nextResolve();
        }
        else {
            this.locked = false;
        }
    }
}
export const Mutex = Elements.wrapper(MutexElement);
