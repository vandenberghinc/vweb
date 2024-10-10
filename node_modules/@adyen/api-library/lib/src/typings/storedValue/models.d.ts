export * from './amount';
export * from './serviceError';
export * from './storedValueBalanceCheckRequest';
export * from './storedValueBalanceCheckResponse';
export * from './storedValueBalanceMergeRequest';
export * from './storedValueBalanceMergeResponse';
export * from './storedValueIssueRequest';
export * from './storedValueIssueResponse';
export * from './storedValueLoadRequest';
export * from './storedValueLoadResponse';
export * from './storedValueStatusChangeRequest';
export * from './storedValueStatusChangeResponse';
export * from './storedValueVoidRequest';
export * from './storedValueVoidResponse';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
