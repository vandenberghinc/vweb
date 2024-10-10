export declare class ProcessingTypesRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * List of processing types.  Possible values: **atmWithdraw**, **balanceInquiry**, **ecommerce**, **moto**, **pos**, **recurring**, **token**.
    */
    'value'?: Array<ProcessingTypesRestriction.ValueEnum>;
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
export declare namespace ProcessingTypesRestriction {
    enum ValueEnum {
        AtmWithdraw = "atmWithdraw",
        BalanceInquiry = "balanceInquiry",
        Ecommerce = "ecommerce",
        Moto = "moto",
        Pos = "pos",
        Recurring = "recurring",
        Token = "token",
        Unknown = "unknown"
    }
}
