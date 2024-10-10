export declare class CapitalBalance {
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes).
    */
    'currency': string;
    /**
    * Fee amount.
    */
    'fee': number;
    /**
    * Principal amount.
    */
    'principal': number;
    /**
    * Total amount. A sum of principal amount and fee amount.
    */
    'total': number;
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
