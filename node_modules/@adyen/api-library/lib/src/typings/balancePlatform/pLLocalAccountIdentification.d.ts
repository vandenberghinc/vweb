export declare class PLLocalAccountIdentification {
    /**
    * The 26-digit bank account number ([Numer rachunku](https://pl.wikipedia.org/wiki/Numer_Rachunku_Bankowego)), without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * **plLocal**
    */
    'type': PLLocalAccountIdentification.TypeEnum;
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
export declare namespace PLLocalAccountIdentification {
    enum TypeEnum {
        PlLocal = "plLocal"
    }
}
