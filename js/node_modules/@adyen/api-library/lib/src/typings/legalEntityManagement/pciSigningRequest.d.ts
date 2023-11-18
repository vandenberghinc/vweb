export declare class PciSigningRequest {
    /**
    * The array of Adyen-generated unique identifiers for the questionnaires.
    */
    'pciTemplateReferences': Array<string>;
    /**
    * The [legal entity ID](https://docs.adyen.com/api-explorer/#/legalentity/latest/post/legalEntities__resParam_id) of the individual who signs the PCI questionnaire.
    */
    'signedBy': string;
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
