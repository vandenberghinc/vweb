export declare class TerminalReassignmentTarget {
    /**
    * The unique identifier of the company account to which the terminal is reassigned.
    */
    'companyId'?: string;
    /**
    * Indicates if the terminal is reassigned to the inventory of the merchant account. - If **true**, the terminal is in the inventory of the merchant account and cannot process transactions. - If **false**, the terminal is reassigned directly to the merchant account and can process transactions.
    */
    'inventory': boolean;
    /**
    * The unique identifier of the merchant account to which the terminal is reassigned.
    */
    'merchantId'?: string;
    /**
    * The unique identifier of the store to which the terminal is reassigned.
    */
    'storeId'?: string;
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
