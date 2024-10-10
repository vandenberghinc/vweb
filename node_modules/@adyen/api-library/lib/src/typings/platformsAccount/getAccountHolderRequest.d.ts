export declare class GetAccountHolderRequest {
    /**
    * The code of the account of which to retrieve the details. > Required if no `accountHolderCode` is provided.
    */
    'accountCode'?: string;
    /**
    * The code of the account holder of which to retrieve the details. > Required if no `accountCode` is provided.
    */
    'accountHolderCode'?: string;
    /**
    * True if the request should return the account holder details
    */
    'showDetails'?: boolean;
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
