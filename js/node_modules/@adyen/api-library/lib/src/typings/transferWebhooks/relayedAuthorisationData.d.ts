export declare class RelayedAuthorisationData {
    /**
    * Contains key-value pairs of your references and descriptions, for example, `customId`:`your-own-custom-field-12345`.
    */
    'metadata'?: {
        [key: string]: string;
    };
    /**
    * Your reference for the relayed authorisation data.
    */
    'reference'?: string;
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
