export declare class GooglePayInfo {
    /**
    * Google Pay [Merchant ID](https://support.google.com/paymentscenter/answer/7163092?hl=en). Character length and limitations: 16 alphanumeric characters or 20 numeric characters.
    */
    'merchantId': string;
    /**
    * Indicates whether the Google Pay Merchant ID is used for several merchant accounts. Default value: **false**.
    */
    'reuseMerchantId'?: boolean;
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
