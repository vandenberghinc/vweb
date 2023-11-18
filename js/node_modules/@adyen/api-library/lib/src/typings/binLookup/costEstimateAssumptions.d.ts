export declare class CostEstimateAssumptions {
    /**
    * If true, the cardholder is expected to successfully authorise via 3D Secure.
    */
    'assume3DSecureAuthenticated'?: boolean;
    /**
    * If true, the transaction is expected to have valid Level 3 data.
    */
    'assumeLevel3Data'?: boolean;
    /**
    * If not zero, the number of installments.
    */
    'installments'?: number;
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
