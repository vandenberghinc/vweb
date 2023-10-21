export * from './createNotificationConfigurationRequest';
export * from './deleteNotificationConfigurationRequest';
export * from './errorFieldType';
export * from './exchangeMessage';
export * from './fieldType';
export * from './genericResponse';
export * from './getNotificationConfigurationListResponse';
export * from './getNotificationConfigurationRequest';
export * from './getNotificationConfigurationResponse';
export * from './notificationConfigurationDetails';
export * from './notificationEventConfiguration';
export * from './serviceError';
export * from './testNotificationConfigurationRequest';
export * from './testNotificationConfigurationResponse';
export * from './updateNotificationConfigurationRequest';
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
