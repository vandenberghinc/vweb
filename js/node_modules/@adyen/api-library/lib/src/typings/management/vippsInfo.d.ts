export declare class VippsInfo {
    /**
    * Vipps logo. Format: Base64-encoded string.
    */
    'logo': string;
    /**
    * Vipps subscription cancel url (required in case of [recurring payments](https://docs.adyen.com/online-payments/tokenization))
    */
    'subscriptionCancelUrl'?: string;
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
