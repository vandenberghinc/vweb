export declare class HKLocalAccountIdentification {
    /**
    * The 9- to 15-character bank account number (alphanumeric), without separators or whitespace. Starts with the 3-digit branch code.
    */
    'accountNumber': string;
    /**
    * The 3-digit clearing code, without separators or whitespace.
    */
    'clearingCode': string;
    /**
    * **hkLocal**
    */
    'type': HKLocalAccountIdentification.TypeEnum;
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
export declare namespace HKLocalAccountIdentification {
    enum TypeEnum {
        HkLocal = "hkLocal"
    }
}
