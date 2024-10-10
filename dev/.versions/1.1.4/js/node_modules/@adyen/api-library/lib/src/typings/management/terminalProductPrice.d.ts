export declare class TerminalProductPrice {
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes).
    */
    'currency'?: string;
    /**
    * The price of the item.
    */
    'value'?: number;
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
