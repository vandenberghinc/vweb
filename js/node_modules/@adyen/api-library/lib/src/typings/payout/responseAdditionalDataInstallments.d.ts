export declare class ResponseAdditionalDataInstallments {
    /**
    * Type of installment. The value of `installmentType` should be **IssuerFinanced**.
    */
    'installmentPaymentData_installmentType'?: string;
    /**
    * Annual interest rate.
    */
    'installmentPaymentData_option_itemNr_annualPercentageRate'?: string;
    /**
    * First Installment Amount in minor units.
    */
    'installmentPaymentData_option_itemNr_firstInstallmentAmount'?: string;
    /**
    * Installment fee amount in minor units.
    */
    'installmentPaymentData_option_itemNr_installmentFee'?: string;
    /**
    * Interest rate for the installment period.
    */
    'installmentPaymentData_option_itemNr_interestRate'?: string;
    /**
    * Maximum number of installments possible for this payment.
    */
    'installmentPaymentData_option_itemNr_maximumNumberOfInstallments'?: string;
    /**
    * Minimum number of installments possible for this payment.
    */
    'installmentPaymentData_option_itemNr_minimumNumberOfInstallments'?: string;
    /**
    * Total number of installments possible for this payment.
    */
    'installmentPaymentData_option_itemNr_numberOfInstallments'?: string;
    /**
    * Subsequent Installment Amount in minor units.
    */
    'installmentPaymentData_option_itemNr_subsequentInstallmentAmount'?: string;
    /**
    * Total amount in minor units.
    */
    'installmentPaymentData_option_itemNr_totalAmountDue'?: string;
    /**
    * Possible values: * PayInInstallmentsOnly * PayInFullOnly * PayInFullOrInstallments
    */
    'installmentPaymentData_paymentOptions'?: string;
    /**
    * The number of installments that the payment amount should be charged with.  Example: 5 > Only relevant for card payments in countries that support installments.
    */
    'installments_value'?: string;
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
