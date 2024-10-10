export declare class AuthenticationResultRequest {
    /**
    * The merchant account identifier, with which the authentication was processed.
    */
    'merchantAccount': string;
    /**
    * The pspReference identifier for the transaction.
    */
    'pspReference': string;
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
