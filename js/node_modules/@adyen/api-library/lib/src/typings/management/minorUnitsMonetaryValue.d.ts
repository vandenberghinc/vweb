export declare class MinorUnitsMonetaryValue {
    /**
    * The transaction amount, in [minor units](https://docs.adyen.com/development-resources/currency-codes).
    */
    'amount'?: number;
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes).
    */
    'currencyCode'?: string;
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
