export declare class RequestActivationResponse {
    /**
    * The unique identifier of the company account.
    */
    'companyId'?: string;
    /**
    * The unique identifier of the merchant account you requested to activate.
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
