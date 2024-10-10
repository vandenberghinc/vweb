export declare class StockData {
    /**
    * The four-digit [Market Identifier Code](https://en.wikipedia.org/wiki/Market_Identifier_Code) of the stock market where the organization\'s stocks are traded.
    */
    'marketIdentifier'?: string;
    /**
    * The 12-digit International Securities Identification Number (ISIN) of the company, without dashes (-).
    */
    'stockNumber'?: string;
    /**
    * The stock ticker symbol.
    */
    'tickerSymbol'?: string;
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
