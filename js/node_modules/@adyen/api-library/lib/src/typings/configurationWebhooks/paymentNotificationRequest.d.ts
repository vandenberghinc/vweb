import { PaymentInstrumentNotificationData } from './paymentInstrumentNotificationData';
export declare class PaymentNotificationRequest {
    'data': PaymentInstrumentNotificationData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of webhook.
    */
    'type': PaymentNotificationRequest.TypeEnum;
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
export declare namespace PaymentNotificationRequest {
    enum TypeEnum {
        Created = "balancePlatform.paymentInstrument.created",
        Updated = "balancePlatform.paymentInstrument.updated"
    }
}
