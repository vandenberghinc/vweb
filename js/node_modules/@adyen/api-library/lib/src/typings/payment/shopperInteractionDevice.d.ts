export declare class ShopperInteractionDevice {
    /**
    * Locale on the shopper interaction device.
    */
    'locale'?: string;
    /**
    * Operating system running on the shopper interaction device.
    */
    'os'?: string;
    /**
    * Version of the operating system on the shopper interaction device.
    */
    'osVersion'?: string;
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
