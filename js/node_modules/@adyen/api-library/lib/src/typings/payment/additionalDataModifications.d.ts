export declare class AdditionalDataModifications {
    /**
    * This is the installment option selected by the shopper. It is required only if specified by the user.
    */
    'installmentPaymentData_selectedInstallmentOption'?: string;
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
