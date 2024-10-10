export * from './balancePlatformNotificationResponse';
export * from './reportNotificationData';
export * from './reportNotificationRequest';
export * from './resource';
export * from './resourceReference';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
