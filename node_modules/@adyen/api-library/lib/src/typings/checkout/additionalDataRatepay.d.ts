export declare class AdditionalDataRatepay {
    /**
    * Amount the customer has to pay each month.
    */
    'ratepay_installmentAmount'?: string;
    /**
    * Interest rate of this installment.
    */
    'ratepay_interestRate'?: string;
    /**
    * Amount of the last installment.
    */
    'ratepay_lastInstallmentAmount'?: string;
    /**
    * Calendar day of the first payment.
    */
    'ratepay_paymentFirstday'?: string;
    /**
    * Date the merchant delivered the goods to the customer.
    */
    'ratepaydata_deliveryDate'?: string;
    /**
    * Date by which the customer must settle the payment.
    */
    'ratepaydata_dueDate'?: string;
    /**
    * Invoice date, defined by the merchant. If not included, the invoice date is set to the delivery date.
    */
    'ratepaydata_invoiceDate'?: string;
    /**
    * Identification name or number for the invoice, defined by the merchant.
    */
    'ratepaydata_invoiceId'?: string;
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
