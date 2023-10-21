export declare class MerchantDevice {
    /**
    * Operating system running on the merchant device.
    */
    'os'?: string;
    /**
    * Version of the operating system on the merchant device.
    */
    'osVersion'?: string;
    /**
    * Merchant device reference.
    */
    'reference'?: string;
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
