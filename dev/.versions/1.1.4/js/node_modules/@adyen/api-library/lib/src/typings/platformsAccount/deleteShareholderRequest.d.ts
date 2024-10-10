export declare class DeleteShareholderRequest {
    /**
    * The code of the Account Holder from which to delete the Shareholders.
    */
    'accountHolderCode': string;
    /**
    * The code(s) of the Shareholders to be deleted.
    */
    'shareholderCodes': Array<string>;
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
