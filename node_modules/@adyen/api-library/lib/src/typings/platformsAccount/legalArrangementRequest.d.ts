export declare class LegalArrangementRequest {
    /**
    * The code of the legal arrangement to be deleted. If you also send `legalArrangementEntityCodes`, only the entities listed will be deleted.
    */
    'legalArrangementCode': string;
    /**
    * List of legal arrangement entities to be deleted.
    */
    'legalArrangementEntityCodes'?: Array<string>;
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
