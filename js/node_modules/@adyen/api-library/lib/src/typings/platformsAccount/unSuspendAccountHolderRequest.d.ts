export declare class UnSuspendAccountHolderRequest {
    /**
    * The code of the account holder to be reinstated.
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
