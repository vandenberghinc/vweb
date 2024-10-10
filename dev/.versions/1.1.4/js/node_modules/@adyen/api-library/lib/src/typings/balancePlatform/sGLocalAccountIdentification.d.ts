export declare class SGLocalAccountIdentification {
    /**
    * The 4- to 19-digit bank account number, without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * The bank\'s 8- or 11-character BIC or SWIFT code.
    */
    'bic': string;
    /**
    * **sgLocal**
    */
    'type'?: SGLocalAccountIdentification.TypeEnum;
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
export declare namespace SGLocalAccountIdentification {
    enum TypeEnum {
        SgLocal = "sgLocal"
    }
}
