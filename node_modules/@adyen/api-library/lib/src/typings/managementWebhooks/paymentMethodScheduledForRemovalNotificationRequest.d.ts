import { MidServiceNotificationData } from './midServiceNotificationData';
export declare class PaymentMethodScheduledForRemovalNotificationRequest {
    /**
    * Timestamp for when the webhook was created.
    */
    'createdAt': Date;
    'data': MidServiceNotificationData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of notification.
    */
    'type': PaymentMethodScheduledForRemovalNotificationRequest.TypeEnum;
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
export declare namespace PaymentMethodScheduledForRemovalNotificationRequest {
    enum TypeEnum {
        PaymentMethodRequestScheduledForRemoval = "paymentMethod.requestScheduledForRemoval"
    }
}
