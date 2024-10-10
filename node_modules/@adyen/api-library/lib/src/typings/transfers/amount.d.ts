export declare class Amount {
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes).
    */
    'currency': string;
    /**
    * The amount of the transaction, in [minor units](https://docs.adyen.com/development-resources/currency-codes).
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
