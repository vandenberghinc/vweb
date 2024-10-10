export declare class DragonpayDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The Dragonpay issuer value of the shopper\'s selected bank. Set this to an **id** of a Dragonpay issuer to preselect it.
    */
    'issuer': string;
    /**
    * The shopper’s email address.
    */
    'shopperEmail'?: string;
    /**
    * **dragonpay**
    */
    'type': DragonpayDetails.TypeEnum;
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
export declare namespace DragonpayDetails {
    enum TypeEnum {
        Ebanking = "dragonpay_ebanking",
        OtcBanking = "dragonpay_otc_banking",
        OtcNonBanking = "dragonpay_otc_non_banking",
        OtcPhilippines = "dragonpay_otc_philippines"
    }
}
