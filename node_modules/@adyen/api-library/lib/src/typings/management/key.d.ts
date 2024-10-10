export declare class Key {
    /**
    * The unique identifier of the shared key.
    */
    'identifier'?: string;
    /**
    * The secure passphrase to protect the shared key.
    */
    'passphrase'?: string;
    /**
    * The version number of the shared key.
    */
    'version'?: number;
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
