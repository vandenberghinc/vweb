export declare class CardBrandDetails {
    /**
    * Indicates if you support the card brand.
    */
    'supported'?: boolean;
    /**
    * The name of the card brand.
    */
    'type'?: string;
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
