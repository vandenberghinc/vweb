export declare class MigratedAccounts {
    /**
    * The unique identifier of the account of the migrated account holder in the balance platform.
    */
    'balanceAccountId'?: string;
    /**
    * The unique identifier of the account of the migrated account holder in the classic integration.
    */
    'virtualAccountCode'?: string;
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
