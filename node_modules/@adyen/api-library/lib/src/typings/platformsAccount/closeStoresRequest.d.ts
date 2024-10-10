export declare class CloseStoresRequest {
    /**
    * The code of the account holder.
    */
    'accountHolderCode': string;
    /**
    * List of stores to be closed.
    */
    'stores': Array<string>;
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
