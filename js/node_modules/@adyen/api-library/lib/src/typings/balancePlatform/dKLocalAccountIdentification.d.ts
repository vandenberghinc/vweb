export declare class DKLocalAccountIdentification {
    /**
    * The 4-10 digits bank account number (Kontonummer) (without separators or whitespace).
    */
    'accountNumber': string;
    /**
    * The 4-digit bank code (Registreringsnummer) (without separators or whitespace).
    */
    'bankCode': string;
    /**
    * **dkLocal**
    */
    'type': DKLocalAccountIdentification.TypeEnum;
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
export declare namespace DKLocalAccountIdentification {
    enum TypeEnum {
        DkLocal = "dkLocal"
    }
}
