export declare class BulkAddress {
    /**
    * The name of the city.
    */
    'city'?: string;
    /**
    * The name of the company.
    */
    'company'?: string;
    /**
    * The two-character ISO-3166-1 alpha-2 country code. For example, **US**.
    */
    'country': string;
    /**
    * The email address.
    */
    'email'?: string;
    /**
    * The house number or name.
    */
    'houseNumberOrName'?: string;
    /**
    * The full telephone number.
    */
    'mobile'?: string;
    /**
    * The postal code.  Maximum length:  * 5 digits for addresses in the US.  * 10 characters for all other countries.
    */
    'postalCode'?: string;
    /**
    * The two-letter ISO 3166-2 state or province code.  Maximum length: 2 characters for addresses in the US.
    */
    'stateOrProvince'?: string;
    /**
    * The streetname of the house.
    */
    'street'?: string;
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
