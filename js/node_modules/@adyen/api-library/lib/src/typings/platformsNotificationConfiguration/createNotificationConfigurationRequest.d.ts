import { NotificationConfigurationDetails } from './notificationConfigurationDetails';
export declare class CreateNotificationConfigurationRequest {
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
