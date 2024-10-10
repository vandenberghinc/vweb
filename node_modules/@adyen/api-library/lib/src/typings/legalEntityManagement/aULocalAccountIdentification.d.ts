export declare class AULocalAccountIdentification {
    /**
    * The bank account number, without separators or whitespace.
    */
    'accountNumber': string;
    /**
    * The 6-digit [Bank State Branch (BSB) code](https://en.wikipedia.org/wiki/Bank_state_branch), without separators or whitespace.
    */
    'bsbCode': string;
    /**
    * **auLocal**
    */
    'type': AULocalAccountIdentification.TypeEnum;
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
export declare namespace AULocalAccountIdentification {
    enum TypeEnum {
        AuLocal = "auLocal"
    }
}
