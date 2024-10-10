export declare class DotpayDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The Dotpay issuer value of the shopper\'s selected bank. Set this to an **id** of a Dotpay issuer to preselect it.
    */
    'issuer': string;
    /**
    * **dotpay**
    */
    'type'?: DotpayDetails.TypeEnum;
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
export declare namespace DotpayDetails {
    enum TypeEnum {
        Dotpay = "dotpay"
    }
}
