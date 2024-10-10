import { PciDocumentInfo } from './pciDocumentInfo';
export declare class GetPciQuestionnaireInfosResponse {
    /**
    * Information about the signed PCI questionnaires.
    */
    'data'?: Array<PciDocumentInfo>;
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
