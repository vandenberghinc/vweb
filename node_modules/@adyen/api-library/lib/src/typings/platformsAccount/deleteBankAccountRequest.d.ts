export declare class DeleteBankAccountRequest {
    /**
    * The code of the Account Holder from which to delete the Bank Account(s).
    */
    'accountHolderCode': string;
    /**
    * The code(s) of the Bank Accounts to be deleted.
    */
    'bankAccountUUIDs': Array<string>;
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
