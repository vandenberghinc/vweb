export declare class PermitResult {
    /**
    * The key to link permit requests to permit results.
    */
    'resultKey'?: string;
    /**
    * The permit token which is used to make payments by the partner company.
    */
    'token'?: string;
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
