import { CapabilityProblemEntityRecursive } from './capabilityProblemEntityRecursive';
export declare class CapabilityProblemEntity {
    /**
    * List of document IDs to which the verification errors related to the capabilities correspond to.
    */
    'documents'?: Array<string>;
    /**
    * The ID of the entity.
    */
    'id'?: string;
    'owner'?: CapabilityProblemEntityRecursive;
    /**
    * The type of entity.  Possible values: **LegalEntity**, **BankAccount**, or **Document**.
    */
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
        LegalEntity = "LegalEntity"
    }
}
