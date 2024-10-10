export declare class MasterpassDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The funding source that should be used when multiple sources are available. For Brazilian combo cards, by default the funding source is credit. To use debit, set this value to **debit**.
    */
    'fundingSource'?: MasterpassDetails.FundingSourceEnum;
    /**
    * The Masterpass transaction ID.
    */
    'masterpassTransactionId': string;
    /**
    * **masterpass**
    */
    'type'?: MasterpassDetails.TypeEnum;
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
export declare namespace MasterpassDetails {
    enum FundingSourceEnum {
        Credit = "credit",
        Debit = "debit"
    }
    enum TypeEnum {
        Masterpass = "masterpass"
    }
}
