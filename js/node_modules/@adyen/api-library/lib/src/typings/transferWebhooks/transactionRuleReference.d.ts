export declare class TransactionRuleReference {
    /**
    * The description of the resource.
    */
    'description'?: string;
    /**
    * The unique identifier of the resource.
    */
    'id'?: string;
    /**
    * The outcome type of the rule.
    */
    'outcomeType'?: string;
    /**
    * The reference for the resource.
    */
    'reference'?: string;
    /**
    * The score of the rule in case it\'s a scoreBased rule.
    */
    'score'?: number;
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
