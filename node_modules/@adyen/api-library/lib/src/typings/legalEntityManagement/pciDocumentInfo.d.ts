export declare class PciDocumentInfo {
    /**
    * The date the questionnaire was created, in ISO 8601 extended format. For example, 2022-12-18T10:15:30+01:00
    */
    'createdAt'?: Date;
    /**
    * The unique identifier of the signed questionnaire.
    */
    'id'?: string;
    /**
    * The expiration date of the questionnaire, in ISO 8601 extended format. For example, 2022-12-18T10:15:30+01:00
    */
    'validUntil'?: Date;
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
