export declare class GetStoresUnderAccountRequest {
    /**
    * The company account. If you only specify this parameter, the response includes the stores of all merchant accounts that are associated with the company account.
    */
    'companyAccount': string;
    /**
    * The merchant account. With this parameter, the response only includes the stores of the specified merchant account.
    */
    'merchantAccount'?: string;
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
