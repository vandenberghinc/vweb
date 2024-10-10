export declare class SameAmountRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    'value'?: boolean;
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
