export declare class ResponseAdditionalDataNetworkTokens {
    /**
    * Indicates whether a network token is available for the specified card.
    */
    'networkToken_available'?: string;
    /**
    * The Bank Identification Number of a tokenized card, which is the first six digits of a card number.
    */
    'networkToken_bin'?: string;
    /**
    * The last four digits of a network token.
    */
    'networkToken_tokenSummary'?: string;
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
