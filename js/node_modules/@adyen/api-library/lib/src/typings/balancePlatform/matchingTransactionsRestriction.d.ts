export declare class MatchingTransactionsRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * The number of transactions.
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
