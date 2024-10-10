export declare class VisaCheckoutDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The funding source that should be used when multiple sources are available. For Brazilian combo cards, by default the funding source is credit. To use debit, set this value to **debit**.
    */
    'fundingSource'?: VisaCheckoutDetails.FundingSourceEnum;
    /**
    * **visacheckout**
    */
    'type'?: VisaCheckoutDetails.TypeEnum;
    /**
    * The Visa Click to Pay Call ID value. When your shopper selects a payment and/or a shipping address from Visa Click to Pay, you will receive a Visa Click to Pay Call ID.
    */
    'visaCheckoutCallId': string;
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
export declare namespace VisaCheckoutDetails {
    enum FundingSourceEnum {
        Credit = "credit",
        Debit = "debit"
    }
    enum TypeEnum {
        Visacheckout = "visacheckout"
    }
}
