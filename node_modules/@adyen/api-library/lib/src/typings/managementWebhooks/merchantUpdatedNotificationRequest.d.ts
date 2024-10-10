import { AccountUpdateNotificationData } from './accountUpdateNotificationData';
export declare class MerchantUpdatedNotificationRequest {
    /**
    * Timestamp for when the webhook was created.
    */
    'createdAt': Date;
    'data': AccountUpdateNotificationData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of notification.
    */
    'type': MerchantUpdatedNotificationRequest.TypeEnum;
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
export declare namespace MerchantUpdatedNotificationRequest {
    enum TypeEnum {
        MerchantUpdated = "merchant.updated"
    }
}
