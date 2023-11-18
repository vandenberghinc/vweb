import { Url } from './url';
export declare class EventUrl {
    /**
    * One or more local URLs to send event notifications to when using Terminal API.
    */
    'eventLocalUrls'?: Array<Url>;
    /**
    * One or more public URLs to send event notifications to when using Terminal API.
    */
    'eventPublicUrls'?: Array<Url>;
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
