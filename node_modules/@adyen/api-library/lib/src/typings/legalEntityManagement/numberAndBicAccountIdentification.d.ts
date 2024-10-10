import { AdditionalBankIdentification } from './additionalBankIdentification';
export declare class NumberAndBicAccountIdentification {
    /**
    * The bank account number, without separators or whitespace. The length and format depends on the bank or country.
    */
    'accountNumber': string;
    'additionalBankIdentification'?: AdditionalBankIdentification;
    /**
    * The bank\'s 8- or 11-character BIC or SWIFT code.
    */
    'bic': string;
    /**
    * **numberAndBic**
    */
    'type': NumberAndBicAccountIdentification.TypeEnum;
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
export declare namespace NumberAndBicAccountIdentification {
    enum TypeEnum {
        NumberAndBic = "numberAndBic"
    }
}
