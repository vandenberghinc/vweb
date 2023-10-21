export * from './amount';
export * from './authenticationInfo';
export * from './authenticationNotificationData';
export * from './authenticationNotificationRequest';
export * from './balancePlatformNotificationResponse';
export * from './challengeInfo';
export * from './purchaseInfo';
export * from './resource';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
