export declare class CapabilityProblemEntityRecursive {
    /**
    * List of document IDs corresponding to the verification errors from capabilities.
    */
    'documents'?: Array<string>;
    'id'?: string;
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
        LegalEntity = "LegalEntity",
        Product = "product"
    }
}
