import { Amount } from './amount';
export declare class CapabilitySettings {
    /**
    * The maximum amount a card holder can spend per industry.
    */
    'amountPerIndustry'?: {
        [key: string]: Amount;
    };
    /**
    * The number of card holders who can use the card.
    */
    'authorizedCardUsers'?: boolean;
    /**
    * The funding source of the card, for example **debit**.
    */
    'fundingSource'?: Array<CapabilitySettings.FundingSourceEnum>;
    /**
    * The period when the rule conditions apply.
    */
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
