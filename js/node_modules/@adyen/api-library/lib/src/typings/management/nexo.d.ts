import { EventUrl } from './eventUrl';
import { Key } from './key';
import { Notification } from './notification';
import { NotificationUrl } from './notificationUrl';
export declare class Nexo {
    'displayUrls'?: NotificationUrl;
    'encryptionKey'?: Key;
    'eventUrls'?: EventUrl;
    /**
    * One or more URLs to send event messages to when using Terminal API.
    */
    'nexoEventUrls'?: Array<string>;
    'notification'?: Notification;
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
