export declare class ActiveNetworkTokensRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * The number of tokens.
    */
    'value'?: number;
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
