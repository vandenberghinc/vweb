export declare class PciSigningResponse {
    /**
    * The unique identifiers of the signed PCI documents.
    */
    'pciQuestionnaireIds'?: Array<string>;
    /**
    * The [legal entity ID](https://docs.adyen.com/api-explorer/#/legalentity/latest/post/legalEntities__resParam_id) of the individual who signed the PCI questionnaire.
    */
    'signedBy'?: string;
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
