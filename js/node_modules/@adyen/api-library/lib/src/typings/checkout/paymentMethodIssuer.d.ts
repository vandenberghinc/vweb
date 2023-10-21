export declare class PaymentMethodIssuer {
    /**
    * A boolean value indicating whether this issuer is unavailable. Can be `true` whenever the issuer is offline.
    */
    'disabled'?: boolean;
    /**
    * The unique identifier of this issuer, to submit in requests to /payments.
    */
    'id': string;
    /**
    * A localized name of the issuer.
    */
    'name': string;
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
