export declare class GenerateHmacKeyResponse {
    /**
    * The HMAC key generated for this webhook.
    */
    'hmacKey': string;
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
