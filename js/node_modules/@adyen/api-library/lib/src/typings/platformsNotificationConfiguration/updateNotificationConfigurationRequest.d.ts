import { NotificationConfigurationDetails } from './notificationConfigurationDetails';
export declare class UpdateNotificationConfigurationRequest {
    'configurationDetails': NotificationConfigurationDetails;
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
