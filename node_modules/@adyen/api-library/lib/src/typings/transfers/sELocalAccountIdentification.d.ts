export declare class SELocalAccountIdentification {
    /**
    * The 7- to 10-digit bank account number ([Bankkontonummer](https://sv.wikipedia.org/wiki/Bankkonto)), without the clearing number, separators, or whitespace.
    */
    'accountNumber': string;
    /**
    * The 4- to 5-digit clearing number ([Clearingnummer](https://sv.wikipedia.org/wiki/Clearingnummer)), without separators or whitespace.
    */
    'clearingNumber': string;
    /**
    * **seLocal**
    */
    'type': SELocalAccountIdentification.TypeEnum;
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
export declare namespace SELocalAccountIdentification {
    enum TypeEnum {
        SeLocal = "seLocal"
    }
}
