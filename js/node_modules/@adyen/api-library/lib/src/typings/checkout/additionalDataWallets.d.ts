export declare class AdditionalDataWallets {
    /**
    * The Android Pay token retrieved from the SDK.
    */
    'androidpay_token'?: string;
    /**
    * The Mastercard Masterpass Transaction ID retrieved from the SDK.
    */
    'masterpass_transactionId'?: string;
    /**
    * The Apple Pay token retrieved from the SDK.
    */
    'payment_token'?: string;
    /**
    * The Google Pay token retrieved from the SDK.
    */
    'paywithgoogle_token'?: string;
    /**
    * The Samsung Pay token retrieved from the SDK.
    */
    'samsungpay_token'?: string;
    /**
    * The Visa Checkout Call ID retrieved from the SDK.
    */
    'visacheckout_callId'?: string;
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
