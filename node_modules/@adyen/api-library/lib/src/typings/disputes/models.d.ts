export * from './acceptDisputeRequest';
export * from './acceptDisputeResponse';
export * from './defendDisputeRequest';
export * from './defendDisputeResponse';
export * from './defenseDocument';
export * from './defenseDocumentType';
export * from './defenseReason';
export * from './defenseReasonsRequest';
export * from './defenseReasonsResponse';
export * from './deleteDefenseDocumentRequest';
export * from './deleteDefenseDocumentResponse';
export * from './disputeServiceResult';
export * from './serviceError';
export * from './supplyDefenseDocumentRequest';
export * from './supplyDefenseDocumentResponse';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
