export declare class KYCCheckSummary {
    /**
    * The code of the check. For possible values, refer to [Verification codes](https://docs.adyen.com/marketplaces-and-platforms/classic/verification-process/verification-codes).
    */
    'kycCheckCode'?: number;
    /**
    * A description of the check.
    */
    'kycCheckDescription'?: string;
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
