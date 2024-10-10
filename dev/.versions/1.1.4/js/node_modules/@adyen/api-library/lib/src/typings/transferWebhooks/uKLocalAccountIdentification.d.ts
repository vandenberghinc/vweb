export declare class UKLocalAccountIdentification {
    /**
    * The 8-digit bank account number, without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * The 6-digit [sort code](https://en.wikipedia.org/wiki/Sort_code), without separators or whitespace.
    */
    'sortCode': string;
    /**
    * **ukLocal**
    */
    'type': UKLocalAccountIdentification.TypeEnum;
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
export declare namespace UKLocalAccountIdentification {
    enum TypeEnum {
        UkLocal = "ukLocal"
    }
}
