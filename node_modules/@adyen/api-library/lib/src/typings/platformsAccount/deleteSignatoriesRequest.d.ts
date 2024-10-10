export declare class DeleteSignatoriesRequest {
    /**
    * The code of the account holder from which to delete the signatories.
    */
    'accountHolderCode': string;
    /**
    * Array of codes of the signatories to be deleted.
    */
    'signatoryCodes': Array<string>;
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
