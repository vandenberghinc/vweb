import { Transaction } from './transaction';
export declare class AccountTransactionList {
    /**
    * The code of the account.
    */
    'accountCode'?: string;
    /**
    * Indicates whether there is a next page of transactions available.
    */
    'hasNextPage'?: boolean;
    /**
    * The list of transactions.
    */
    'transactions'?: Array<Transaction>;
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
