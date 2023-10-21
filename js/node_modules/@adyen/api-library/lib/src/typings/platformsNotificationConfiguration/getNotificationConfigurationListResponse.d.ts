import { ErrorFieldType } from './errorFieldType';
import { NotificationConfigurationDetails } from './notificationConfigurationDetails';
export declare class GetNotificationConfigurationListResponse {
    /**
    * Details of the notification subscription configurations.
    */
    'configurations'?: Array<NotificationConfigurationDetails>;
    /**
    * Contains field validation errors that would prevent requests from being processed.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The reference of a request. Can be used to uniquely identify the request.
    */
    'pspReference'?: string;
    /**
    * The result code.
    */
    'resultCode'?: string;
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
