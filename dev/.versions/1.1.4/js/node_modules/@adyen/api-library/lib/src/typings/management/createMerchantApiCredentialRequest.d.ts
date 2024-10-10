export declare class CreateMerchantApiCredentialRequest {
    /**
    * The list of [allowed origins](https://docs.adyen.com/development-resources/client-side-authentication#allowed-origins) for the new API credential.
    */
    'allowedOrigins'?: Array<string>;
    /**
    * Description of the API credential.
    */
    'description'?: string;
    /**
    * List of [roles](https://docs.adyen.com/development-resources/api-credentials#roles-1) for the API credential. Only roles assigned to \'ws@Company.<CompanyName>\' can be assigned to other API credentials.
    */
    'roles'?: Array<string>;
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
