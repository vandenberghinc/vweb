export declare class CapabilityProblemEntityRecursive {
    /**
    * List of document IDs to which the verification errors related to the capabilities correspond to.
    */
    'documents'?: Array<string>;
    /**
    * The ID of the entity.
    */
    'id'?: string;
    /**
    * Type of entity.   Possible values: **LegalEntity**, **BankAccount**, **Document**.
    */
    'type'?: CapabilityProblemEntityRecursive.TypeEnum;
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
export declare namespace CapabilityProblemEntityRecursive {
    enum TypeEnum {
        BankAccount = "BankAccount",
        Document = "Document",
        LegalEntity = "LegalEntity"
    }
}
