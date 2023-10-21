export declare class AccountHolderBalanceRequest {
    /**
    * The code of the Account Holder of which to retrieve the balance.
    */
    'accountHolderCode': string;
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
