export declare class SamsungPayDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The funding source that should be used when multiple sources are available. For Brazilian combo cards, by default the funding source is credit. To use debit, set this value to **debit**.
    */
    'fundingSource'?: SamsungPayDetails.FundingSourceEnum;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'recurringDetailReference'?: string;
    /**
    * The payload you received from the Samsung Pay SDK response.
    */
    'samsungPayToken': string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'storedPaymentMethodId'?: string;
    /**
    * **samsungpay**
    */
    'type'?: SamsungPayDetails.TypeEnum;
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
export declare namespace SamsungPayDetails {
    enum FundingSourceEnum {
        Credit = "credit",
        Debit = "debit"
    }
    enum TypeEnum {
        Samsungpay = "samsungpay"
    }
}
