import { AccountHolderNotificationData } from './accountHolderNotificationData';
export declare class AccountHolderNotificationRequest {
    'data': AccountHolderNotificationData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of webhook.
    */
    'type': AccountHolderNotificationRequest.TypeEnum;
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
export declare namespace AccountHolderNotificationRequest {
    enum TypeEnum {
        Updated = "balancePlatform.accountHolder.updated",
        Created = "balancePlatform.accountHolder.created"
    }
}
