export declare class SplitAmount {
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes). By default, this is the original payment currency.
    */
    'currency'?: string;
    /**
    * The value of the split amount, in [minor units](https://docs.adyen.com/development-resources/currency-codes).
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
