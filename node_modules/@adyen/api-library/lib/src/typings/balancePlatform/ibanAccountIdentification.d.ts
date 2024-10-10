export declare class IbanAccountIdentification {
    /**
    * The international bank account number as defined in the [ISO-13616](https://www.iso.org/standard/81090.html) standard.
    */
    'iban': string;
    /**
    * **iban**
    */
    'type': IbanAccountIdentification.TypeEnum;
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
export declare namespace IbanAccountIdentification {
    enum TypeEnum {
        Iban = "iban"
    }
}
