import { PaymentInstrument } from './paymentInstrument';
export declare class PaymentInstrumentNotificationData {
    /**
    * The unique identifier of the balance platform.
    */
    'balancePlatform'?: string;
    'paymentInstrument'?: PaymentInstrument;
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
