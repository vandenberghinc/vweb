export declare class ViasAddress {
    /**
    * The name of the city. Required if the `houseNumberOrName`, `street`, `postalCode`, or `stateOrProvince` are provided.
    */
    'city'?: string;
    /**
    * The two-character country code of the address in ISO-3166-1 alpha-2 format. For example, **NL**.
    */
    'country'?: string;
    /**
    * The number or name of the house.
    */
    'houseNumberOrName'?: string;
    /**
    * The postal code. Required if the `houseNumberOrName`, `street`, `city`, or `stateOrProvince` are provided.  Maximum length:  * 5 digits for addresses in the US.  * 10 characters for all other countries.
    */
    'postalCode'?: string;
    /**
    * The abbreviation of the state or province. Required if the `houseNumberOrName`, `street`, `city`, or `postalCode` are provided.   Maximum length:  * 2 characters for addresses in the US or Canada.  * 3 characters for all other countries.
    */
    'stateOrProvince'?: string;
    /**
    * The name of the street. Required if the `houseNumberOrName`, `city`, `postalCode`, or `stateOrProvince` are provided.
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
