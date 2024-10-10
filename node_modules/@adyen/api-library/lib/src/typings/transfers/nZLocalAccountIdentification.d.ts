export declare class NZLocalAccountIdentification {
    /**
    * The 15-16 digit bank account number. The first 2 digits are the bank number, the next 4 digits are the branch number, the next 7 digits are the account number, and the final 2-3 digits are the suffix.
    */
    'accountNumber': string;
    /**
    * **nzLocal**
    */
    'type': NZLocalAccountIdentification.TypeEnum;
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
export declare namespace NZLocalAccountIdentification {
    enum TypeEnum {
        NzLocal = "nzLocal"
    }
}
