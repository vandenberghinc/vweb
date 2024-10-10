export declare class Payment {
    /**
    * The default currency for contactless payments on the payment terminal, as the three-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
    */
    'contactlessCurrency'?: string;
    /**
    * Hides the minor units for the listed [ISO currency codes](https://en.wikipedia.org/wiki/ISO_4217).
    */
    'hideMinorUnitsInCurrencies'?: Array<string>;
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
