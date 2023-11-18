export declare class SwishInfo {
    /**
    * Swish number. Format: 10 digits without spaces. For example, **1231111111**.
    */
    'swishNumber': string;
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
