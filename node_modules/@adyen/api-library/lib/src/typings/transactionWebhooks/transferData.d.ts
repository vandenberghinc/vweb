export declare class TransferData {
    /**
    * The ID of the resource.
    */
    'id'?: string;
    /**
    * The [`reference`](https://docs.adyen.com/api-explorer/#/transfers/latest/post/transfers__reqParam_reference) from the `/transfers` request. If you haven\'t provided any, Adyen generates a unique reference.
    */
    'reference': string;
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
