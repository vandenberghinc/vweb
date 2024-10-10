export declare class CALocalAccountIdentification {
    /**
    * The 5- to 12-digit bank account number, without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * The bank account type.  Possible values: **checking** or **savings**. Defaults to **checking**.
    */
    'accountType'?: CALocalAccountIdentification.AccountTypeEnum;
    /**
    * The 3-digit institution number, without separators or whitespace.
    */
    'institutionNumber': string;
    /**
    * The 5-digit transit number, without separators or whitespace.
    */
    'transitNumber': string;
    /**
    * **caLocal**
    */
    'type': CALocalAccountIdentification.TypeEnum;
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
export declare namespace CALocalAccountIdentification {
    enum AccountTypeEnum {
        Checking = "checking",
        Savings = "savings"
    }
    enum TypeEnum {
        CaLocal = "caLocal"
    }
}
