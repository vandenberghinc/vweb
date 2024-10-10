export declare class ApplePayDetails {
    /**
    * The stringified and base64 encoded `paymentData` you retrieved from the Apple framework.
    */
    'applePayToken': string;
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The funding source that should be used when multiple sources are available. For Brazilian combo cards, by default the funding source is credit. To use debit, set this value to **debit**.
    */
    'fundingSource'?: ApplePayDetails.FundingSourceEnum;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'recurringDetailReference'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'storedPaymentMethodId'?: string;
    /**
    * **applepay**
    */
    'type'?: ApplePayDetails.TypeEnum;
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
export declare namespace ApplePayDetails {
    enum FundingSourceEnum {
        Credit = "credit",
        Debit = "debit"
    }
    enum TypeEnum {
        Applepay = "applepay"
    }
}
