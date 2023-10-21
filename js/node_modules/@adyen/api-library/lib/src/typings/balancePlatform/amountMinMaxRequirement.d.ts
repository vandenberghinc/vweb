export declare class AmountMinMaxRequirement {
    /**
    * Specifies the eligible amounts for a particular route.
    */
    'description'?: string;
    /**
    * Maximum amount.
    */
    'max'?: number;
    /**
    * Minimum amount.
    */
    'min'?: number;
    /**
    * **amountMinMaxRequirement**
    */
    'type': AmountMinMaxRequirement.TypeEnum;
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
export declare namespace AmountMinMaxRequirement {
    enum TypeEnum {
        AmountMinMaxRequirement = "amountMinMaxRequirement"
    }
}
