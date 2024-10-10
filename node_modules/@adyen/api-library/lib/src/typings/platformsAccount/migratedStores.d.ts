export declare class MigratedStores {
    /**
    * The unique identifier of the business line associated with the migrated account holder in the balance platform.
    */
    'businessLineId'?: string;
    /**
    * The unique identifier of the store associated with the migrated account holder in the classic integration.
    */
    'storeCode'?: string;
    /**
    * The unique identifier of the store associated with the migrated account holder in the balance platform.
    */
    'storeId'?: string;
    /**
    * Your reference for the store in the classic integration. The [Customer Area](https://ca-test.adyen.com/) uses this value for the store description.
    */
    'storeReference'?: string;
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
