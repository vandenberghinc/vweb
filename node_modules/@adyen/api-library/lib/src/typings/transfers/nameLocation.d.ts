export declare class NameLocation {
    /**
    * The city where the merchant is located.
    */
    'city'?: string;
    /**
    * The country where the merchant is located in [three-letter country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) format.
    */
    'country'?: string;
    /**
    * The home country in [three-digit country code](https://en.wikipedia.org/wiki/ISO_3166-1_numeric) format, used for government-controlled merchants such as embassies.
    */
    'countryOfOrigin'?: string;
    /**
    * The name of the merchant\'s shop or service.
    */
    'name'?: string;
    /**
    * The raw data.
    */
    'rawData'?: string;
    /**
    * The state where the merchant is located.
    */
    'state'?: string;
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
