import { Url } from './url';
export declare class NotificationUrl {
    /**
    * One or more local URLs to send notifications to when using Terminal API.
    */
    'localUrls'?: Array<Url>;
    /**
    * One or more public URLs to send notifications to when using Terminal API.
    */
    'publicUrls'?: Array<Url>;
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
