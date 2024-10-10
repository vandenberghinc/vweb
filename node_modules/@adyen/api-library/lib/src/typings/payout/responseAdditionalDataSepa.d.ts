export declare class ResponseAdditionalDataSepa {
    /**
    * The transaction signature date.  Format: yyyy-MM-dd
    */
    'sepadirectdebit_dateOfSignature'?: string;
    /**
    * Its value corresponds to the pspReference value of the transaction.
    */
    'sepadirectdebit_mandateId'?: string;
    /**
    * This field can take one of the following values: * OneOff: (OOFF) Direct debit instruction to initiate exactly one direct debit transaction.  * First: (FRST) Initial/first collection in a series of direct debit instructions. * Recurring: (RCUR) Direct debit instruction to carry out regular direct debit transactions initiated by the creditor. * Final: (FNAL) Last/final collection in a series of direct debit instructions.  Example: OOFF
    */
    'sepadirectdebit_sequenceType'?: string;
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
