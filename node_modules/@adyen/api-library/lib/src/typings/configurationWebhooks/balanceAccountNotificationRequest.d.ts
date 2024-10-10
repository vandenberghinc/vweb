import { BalanceAccountNotificationData } from './balanceAccountNotificationData';
export declare class BalanceAccountNotificationRequest {
    'data': BalanceAccountNotificationData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of webhook.
    */
    'type': BalanceAccountNotificationRequest.TypeEnum;
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
export declare namespace BalanceAccountNotificationRequest {
    enum TypeEnum {
        Updated = "balancePlatform.balanceAccount.updated",
        Created = "balancePlatform.balanceAccount.created"
    }
}
