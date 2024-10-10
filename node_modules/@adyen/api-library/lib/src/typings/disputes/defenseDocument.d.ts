export declare class DefenseDocument {
    /**
    * The content of the defense document.
    */
    'content': string;
    /**
    * The content type of the defense document.
    */
    'contentType': string;
    /**
    * The document type code of the defense document.
    */
    'defenseDocumentTypeCode': string;
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
