export declare class MolPayDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The shopper\'s bank. Specify this with the issuer value that corresponds to this bank.
    */
    'issuer': string;
    /**
    * **molpay**
    */
    'type': MolPayDetails.TypeEnum;
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
export declare namespace MolPayDetails {
    enum TypeEnum {
        FpxMy = "molpay_ebanking_fpx_MY",
        Th = "molpay_ebanking_TH"
    }
}
