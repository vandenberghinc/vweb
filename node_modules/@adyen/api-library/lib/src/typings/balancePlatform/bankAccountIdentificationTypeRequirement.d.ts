export declare class BankAccountIdentificationTypeRequirement {
    /**
    * List of bank account identification types: eg.; [iban , numberAndBic]
    */
    'bankAccountIdentificationTypes'?: Array<BankAccountIdentificationTypeRequirement.BankAccountIdentificationTypesEnum>;
    /**
    * Specifies the bank account details for a particular route per required field in this object depending on the country of the bank account and the currency of the transfer.
    */
    'description'?: string;
    /**
    * **bankAccountIdentificationTypeRequirement**
    */
    'type': BankAccountIdentificationTypeRequirement.TypeEnum;
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
export declare namespace BankAccountIdentificationTypeRequirement {
    enum BankAccountIdentificationTypesEnum {
        AuLocal = "auLocal",
        BrLocal = "brLocal",
        CaLocal = "caLocal",
        CzLocal = "czLocal",
        DkLocal = "dkLocal",
        HkLocal = "hkLocal",
        HuLocal = "huLocal",
        Iban = "iban",
        Legacy = "legacy",
        NoLocal = "noLocal",
        NumberAndBic = "numberAndBic",
        NzLocal = "nzLocal",
        PlLocal = "plLocal",
        SeLocal = "seLocal",
        SgLocal = "sgLocal",
        UkLocal = "ukLocal",
        UsLocal = "usLocal"
    }
    enum TypeEnum {
        BankAccountIdentificationTypeRequirement = "bankAccountIdentificationTypeRequirement"
    }
}
