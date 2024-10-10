export declare class DokuDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The shopper\'s first name.
    */
    'firstName': string;
    /**
    * The shopper\'s last name.
    */
    'lastName': string;
    /**
    * The shopper\'s email.
    */
    'shopperEmail': string;
    /**
    * **doku**
    */
    'type': DokuDetails.TypeEnum;
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
export declare namespace DokuDetails {
    enum TypeEnum {
        MandiriVa = "doku_mandiri_va",
        CimbVa = "doku_cimb_va",
        DanamonVa = "doku_danamon_va",
        BniVa = "doku_bni_va",
        PermataLiteAtm = "doku_permata_lite_atm",
        BriVa = "doku_bri_va",
        BcaVa = "doku_bca_va",
        Alfamart = "doku_alfamart",
        Indomaret = "doku_indomaret",
        Wallet = "doku_wallet",
        Ovo = "doku_ovo"
    }
}
