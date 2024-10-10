export * from './address';
export * from './assignTerminalsRequest';
export * from './assignTerminalsResponse';
export * from './findTerminalRequest';
export * from './findTerminalResponse';
export * from './getStoresUnderAccountRequest';
export * from './getStoresUnderAccountResponse';
export * from './getTerminalDetailsRequest';
export * from './getTerminalDetailsResponse';
export * from './getTerminalsUnderAccountRequest';
export * from './getTerminalsUnderAccountResponse';
export * from './merchantAccount';
export * from './serviceError';
export * from './store';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
