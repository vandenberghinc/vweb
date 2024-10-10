export declare class CloseAccountHolderRequest {
    /**
    * The code of the Account Holder to be closed.
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
