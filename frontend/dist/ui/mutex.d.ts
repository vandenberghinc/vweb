export declare class MutexElement {
    constructor();
    lock(): Promise<unknown>;
    unlock(): void;
}
export declare const Mutex: any;
