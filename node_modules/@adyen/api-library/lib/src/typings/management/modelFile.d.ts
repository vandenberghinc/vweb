export declare class ModelFile {
    /**
    * The certificate content converted to a Base64-encoded string.
    */
    'data': string;
    /**
    * The name of the certificate. Must be unique across Wi-Fi profiles.
    */
    'name': string;
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
