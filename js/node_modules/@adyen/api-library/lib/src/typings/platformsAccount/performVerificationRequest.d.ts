export declare class PerformVerificationRequest {
    /**
    * The code of the account holder to verify.
    */
    'accountHolderCode': string;
    /**
    * The state required for the account holder. > Permitted values: `Processing`, `Payout`.
    */
    'accountStateType': PerformVerificationRequest.AccountStateTypeEnum;
    /**
    * The tier required for the account holder.
    */
    'tier': number;
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
export declare namespace PerformVerificationRequest {
    enum AccountStateTypeEnum {
        LimitedPayout = "LimitedPayout",
        LimitedProcessing = "LimitedProcessing",
        LimitlessPayout = "LimitlessPayout",
        LimitlessProcessing = "LimitlessProcessing",
        Payout = "Payout",
        Processing = "Processing"
    }
}
