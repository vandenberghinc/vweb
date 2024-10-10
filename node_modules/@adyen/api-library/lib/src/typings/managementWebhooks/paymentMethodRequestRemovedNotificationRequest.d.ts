import { MidServiceNotificationData } from './midServiceNotificationData';
export declare class PaymentMethodRequestRemovedNotificationRequest {
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
    'type': PaymentMethodRequestRemovedNotificationRequest.TypeEnum;
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
export declare namespace PaymentMethodRequestRemovedNotificationRequest {
    enum TypeEnum {
        PaymentMethodRequestRemoved = "paymentMethod.requestRemoved"
    }
}
