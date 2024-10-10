export declare class GetNotificationConfigurationRequest {
    /**
    * The ID of the notification subscription configuration whose details are to be retrieved.
    */
    'notificationId': number;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
