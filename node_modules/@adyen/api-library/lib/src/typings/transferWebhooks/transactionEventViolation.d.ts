import { TransactionRuleReference } from './transactionRuleReference';
import { TransactionRuleSource } from './transactionRuleSource';
export declare class TransactionEventViolation {
    /**
    * An explanation about why the transaction rule failed.
    */
    'reason'?: string;
    'transactionRule'?: TransactionRuleReference;
    'transactionRuleSource'?: TransactionRuleSource;
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
