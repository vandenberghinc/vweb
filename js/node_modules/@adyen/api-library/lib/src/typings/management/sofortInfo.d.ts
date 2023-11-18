export declare class SofortInfo {
    /**
    * Sofort currency code. For example, **EUR**.
    */
    'currencyCode': string;
    /**
    * Sofort logo. Format: Base64-encoded string.
    */
    'logo': string;
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
