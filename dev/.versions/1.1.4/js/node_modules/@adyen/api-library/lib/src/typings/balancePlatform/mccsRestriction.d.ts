export declare class MccsRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * List of merchant category codes (MCCs).
    */
    'value'?: Array<string>;
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
