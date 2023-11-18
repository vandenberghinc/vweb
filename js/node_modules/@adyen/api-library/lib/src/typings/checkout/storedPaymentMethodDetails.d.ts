export declare class StoredPaymentMethodDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'recurringDetailReference'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'storedPaymentMethodId'?: string;
    /**
    * The payment method type.
    */
    'type'?: StoredPaymentMethodDetails.TypeEnum;
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
export declare namespace StoredPaymentMethodDetails {
    enum TypeEnum {
        BcmcMobile = "bcmc_mobile",
        BcmcMobileQr = "bcmc_mobile_QR",
        BcmcMobileApp = "bcmc_mobile_app",
        MomoWallet = "momo_wallet",
        MomoWalletApp = "momo_wallet_app",
        Twint = "twint",
        PaymayaWallet = "paymaya_wallet",
        GrabpaySg = "grabpay_SG",
        GrabpayMy = "grabpay_MY",
        GrabpayTh = "grabpay_TH",
        GrabpayId = "grabpay_ID",
        GrabpayVn = "grabpay_VN",
        GrabpayPh = "grabpay_PH",
        Oxxo = "oxxo",
        Gcash = "gcash",
        Dana = "dana",
        Kakaopay = "kakaopay",
        Truemoney = "truemoney"
    }
}
