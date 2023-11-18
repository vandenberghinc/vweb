export declare class DeletePayoutMethodRequest {
    /**
    * The code of the account holder, from which to delete the payout methods.
    */
    'accountHolderCode': string;
    /**
    * The codes of the payout methods to be deleted.
    */
    'payoutMethodCodes': Array<string>;
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
