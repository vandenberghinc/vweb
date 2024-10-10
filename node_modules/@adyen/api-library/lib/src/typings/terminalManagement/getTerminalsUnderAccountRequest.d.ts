export declare class GetTerminalsUnderAccountRequest {
    /**
    * Your company account. If you only specify this parameter, the response includes all terminals at all account levels.
    */
    'companyAccount': string;
    /**
    * The merchant account. This is required if you are retrieving the terminals assigned to a store.If you don\'t specify a `store` the response includes the terminals assigned to the specified merchant account and the terminals assigned to the stores under this merchant account.
    */
    'merchantAccount'?: string;
    /**
    * The store code of the store. With this parameter, the response only includes the terminals assigned to the specified store.
    */
    'store'?: string;
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
