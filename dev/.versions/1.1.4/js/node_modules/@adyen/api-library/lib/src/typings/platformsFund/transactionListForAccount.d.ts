export declare class TransactionListForAccount {
    /**
    * The account for which to retrieve the transactions.
    */
    'accountCode': string;
    /**
    * The page of transactions to retrieve. Each page lists fifty (50) transactions.  The most recent transactions are included on page 1.
    */
    'page': number;
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
