export declare class ResponseAdditionalDataDomesticError {
    /**
    * The reason the transaction was declined, given by the local issuer.  Currently available for merchants in Japan.
    */
    'domesticRefusalReasonRaw'?: string;
    /**
    * The action the shopper should take, in a local language.  Currently available in Japanese, for merchants in Japan.
    */
    'domesticShopperAdvice'?: string;
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
