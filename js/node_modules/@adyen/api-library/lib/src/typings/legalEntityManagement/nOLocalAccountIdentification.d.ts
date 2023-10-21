export declare class NOLocalAccountIdentification {
    /**
    * The 11-digit bank account number, without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * **noLocal**
    */
    'type': NOLocalAccountIdentification.TypeEnum;
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
export declare namespace NOLocalAccountIdentification {
    enum TypeEnum {
        NoLocal = "noLocal"
    }
}
