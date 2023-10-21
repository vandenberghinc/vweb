import { TransactionRule } from './transactionRule';
export declare class TransactionRulesResponse {
    /**
    * List of transaction rules.
    */
    'transactionRules'?: Array<TransactionRule>;
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
