export declare class Expiry {
    /**
    * The month in which the card will expire.
    */
    'month'?: string;
    /**
    * The year in which the card will expire.
    */
    'year'?: string;
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
