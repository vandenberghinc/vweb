import { Expiry } from './expiry';
export declare class PaymentInstrumentRevealInfo {
    /**
    * The CVC2 value of the card.
    */
    'cvc': string;
    'expiration': Expiry;
    /**
    * The primary account number (PAN) of the card.
    */
    'pan': string;
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
