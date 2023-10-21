import { Amount } from './amount';
export declare class CapabilitySettings {
    'amountPerIndustry'?: {
        [key: string]: Amount;
    };
    'authorizedCardUsers'?: boolean;
    'fundingSource'?: Array<CapabilitySettings.FundingSourceEnum>;
    'interval'?: CapabilitySettings.IntervalEnum;
    'maxAmount'?: Amount;
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
export declare namespace CapabilitySettings {
    enum FundingSourceEnum {
        Credit = "credit",
        Debit = "debit",
        Prepaid = "prepaid"
    }
    enum IntervalEnum {
        Daily = "daily",
        Monthly = "monthly",
        Weekly = "weekly"
    }
}
