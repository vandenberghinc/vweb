export declare class Address {
    /**
    * The name of the city.
    */
    'city'?: string;
    /**
    * The name of the company.
    */
    'companyName'?: string;
    /**
    * The two-letter country code, in [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
    */
    'country'?: string;
    /**
    * The postal code.
    */
    'postalCode'?: string;
    /**
    * The state or province as defined in [ISO 3166-2](https://www.iso.org/standard/72483.html). For example, **ON** for Ontario, Canada.   Applicable for the following countries: - Australia - Brazil - Canada - India - Mexico - New Zealand - United States
    */
    'stateOrProvince'?: string;
    /**
    * The name of the street, and the house or building number.
    */
    'streetAddress'?: string;
    /**
    * Additional address details, if any.
    */
    'streetAddress2'?: string;
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
