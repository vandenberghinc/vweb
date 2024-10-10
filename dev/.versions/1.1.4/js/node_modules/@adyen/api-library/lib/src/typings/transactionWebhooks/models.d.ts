export * from './amount';
export * from './balancePlatformNotificationResponse';
export * from './resource';
export * from './resourceReference';
export * from './transaction';
export * from './transactionNotificationRequestV4';
export * from './transferData';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
