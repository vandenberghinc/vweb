export declare class MerchantAcquirerPair {
    /**
    * The acquirer ID.
    */
    'acquirerId'?: string;
    /**
    * The merchant identification number (MID).
    */
    'merchantId'?: string;
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
