export declare class SplitAmount {
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes).  If this value is not provided, the currency in which the payment is made will be used.
    */
    'currency'?: string;
    /**
    * The amount in [minor units](https://docs.adyen.com/development-resources/currency-codes).
    */
    'value': number;
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
