import { CapabilityProblemEntityRecursive } from './capabilityProblemEntityRecursive';
export declare class CapabilityProblemEntity {
    /**
    * List of document IDs corresponding to the verification errors from capabilities.
    */
    'documents'?: Array<string>;
    'id'?: string;
    'owner'?: CapabilityProblemEntityRecursive;
    'type'?: CapabilityProblemEntity.TypeEnum;
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
export declare namespace CapabilityProblemEntity {
    enum TypeEnum {
        BankAccount = "BankAccount",
        Document = "Document",
        LegalEntity = "LegalEntity",
        Product = "product"
    }
}
