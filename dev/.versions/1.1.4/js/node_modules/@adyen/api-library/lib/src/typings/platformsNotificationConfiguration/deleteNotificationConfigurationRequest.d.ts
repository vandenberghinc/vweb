export declare class DeleteNotificationConfigurationRequest {
    /**
    * A list of IDs of the notification subscription configurations to be deleted.
    */
    'notificationIds': Array<number>;
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
