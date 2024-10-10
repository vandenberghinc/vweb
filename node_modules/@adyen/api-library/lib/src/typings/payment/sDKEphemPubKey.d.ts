export declare class SDKEphemPubKey {
    /**
    * The `crv` value as received from the 3D Secure 2 SDK.
    */
    'crv'?: string;
    /**
    * The `kty` value as received from the 3D Secure 2 SDK.
    */
    'kty'?: string;
    /**
    * The `x` value as received from the 3D Secure 2 SDK.
    */
    'x'?: string;
    /**
    * The `y` value as received from the 3D Secure 2 SDK.
    */
    'y'?: string;
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
