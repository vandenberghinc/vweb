import { SplitConfigurationRule } from './splitConfigurationRule';
export declare class SplitConfiguration {
    /**
    * Your description for the split configuration.
    */
    'description': string;
    /**
    * Array of rules that define the split configuration behavior.
    */
    'rules': Array<SplitConfigurationRule>;
    /**
    * Unique identifier of the split configuration.
    */
    'splitConfigurationId'?: string;
    /**
    * List of stores to which the split configuration applies.
    */
    'stores'?: Array<string>;
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
