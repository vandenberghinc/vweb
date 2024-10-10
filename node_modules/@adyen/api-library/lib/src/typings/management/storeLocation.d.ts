export declare class StoreLocation {
    /**
    * The name of the city.
    */
    'city'?: string;
    /**
    * The two-letter country code in [ISO_3166-1_alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
    */
    'country': string;
    /**
    * The street address.
    */
    'line1'?: string;
    /**
    * Second address line.
    */
    'line2'?: string;
    /**
    * Third address line.
    */
    'line3'?: string;
    /**
    * The postal code.
    */
    'postalCode'?: string;
    /**
    * The state or province code as defined in [ISO 3166-2](https://www.iso.org/standard/72483.html). For example, **ON** for Ontario, Canada.  Required for the following countries:  - Australia - Brazil - Canada - India - Mexico - New Zealand - United States
    */
    'stateOrProvince'?: string;
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
