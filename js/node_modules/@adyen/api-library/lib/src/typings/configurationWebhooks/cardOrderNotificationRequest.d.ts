import { CardOrderItem } from './cardOrderItem';
export declare class CardOrderNotificationRequest {
    'data': CardOrderItem;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of webhook.
    */
    'type': CardOrderNotificationRequest.TypeEnum;
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
export declare namespace CardOrderNotificationRequest {
    enum TypeEnum {
        Created = "balancePlatform.cardorder.created",
        Updated = "balancePlatform.cardorder.updated"
    }
}
