export declare class HULocalAccountIdentification {
    /**
    * The 24-digit bank account number, without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * **huLocal**
    */
    'type': HULocalAccountIdentification.TypeEnum;
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
export declare namespace HULocalAccountIdentification {
    enum TypeEnum {
        HuLocal = "huLocal"
    }
}
