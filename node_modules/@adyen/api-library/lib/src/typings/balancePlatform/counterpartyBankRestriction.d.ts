import { BankIdentification } from './bankIdentification';
export declare class CounterpartyBankRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * List of counterparty Bank Institutions and the operation.
    */
    'value'?: Array<BankIdentification>;
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
