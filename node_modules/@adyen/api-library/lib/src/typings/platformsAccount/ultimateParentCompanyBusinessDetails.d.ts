export declare class UltimateParentCompanyBusinessDetails {
    /**
    * The legal name of the company.
    */
    'legalBusinessName'?: string;
    /**
    * The registration number of the company.
    */
    'registrationNumber'?: string;
    /**
    * Market Identifier Code (MIC).
    */
    'stockExchange'?: string;
    /**
    * International Securities Identification Number (ISIN).
    */
    'stockNumber'?: string;
    /**
    * Stock Ticker symbol.
    */
    'stockTicker'?: string;
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
