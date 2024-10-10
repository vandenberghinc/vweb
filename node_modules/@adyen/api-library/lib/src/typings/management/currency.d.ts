export declare class Currency {
    /**
    * Surcharge amount per transaction, in [minor units](https://docs.adyen.com/development-resources/currency-codes).
    */
    'amount'?: number;
    /**
    * Three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes). For example, **AUD**.
    */
    'currencyCode': string;
    /**
    * Surcharge percentage per transaction. The maximum number of decimal places is two. For example, **1%** or **2.27%**.
    */
    'percentage'?: number;
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
