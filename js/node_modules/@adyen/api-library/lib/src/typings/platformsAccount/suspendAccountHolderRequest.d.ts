export declare class SuspendAccountHolderRequest {
    /**
    * The code of the account holder to be suspended.
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
