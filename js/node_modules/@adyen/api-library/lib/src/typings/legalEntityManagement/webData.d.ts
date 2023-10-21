export declare class WebData {
    /**
    * The URL of the website or the app store URL.
    */
    'webAddress'?: string;
    /**
    * The unique identifier of the web address.
    */
    'webAddressId'?: string;
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
