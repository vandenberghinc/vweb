import { TransactionEventViolation } from './transactionEventViolation';
export declare class TransactionRulesResult {
    /**
    * The advice given by the Risk analysis.
    */
    'advice'?: string;
    /**
    * Indicates whether the transaction passed the evaluation for all hardblock rules
    */
    'allHardBlockRulesPassed'?: boolean;
    /**
    * The score of the Risk analysis.
    */
    'score'?: number;
    /**
    * Array containing all the transaction rules that the transaction triggered.
    */
    'triggeredTransactionRules'?: Array<TransactionEventViolation>;
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
