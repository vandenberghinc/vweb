export declare class KlarnaDetails {
    /**
    * The address where to send the invoice.
    */
    'billingAddress'?: string;
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * The address where the goods should be delivered.
    */
    'deliveryAddress'?: string;
    /**
    * Shopper name, date of birth, phone number, and email address.
    */
    'personalDetails'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'recurringDetailReference'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'storedPaymentMethodId'?: string;
    /**
    * The type of flow to initiate.
    */
    'subtype'?: string;
    /**
    * **klarna**
    */
    'type': KlarnaDetails.TypeEnum;
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
export declare namespace KlarnaDetails {
    enum TypeEnum {
        Klarna = "klarna",
        Klarnapayments = "klarnapayments",
        KlarnapaymentsAccount = "klarnapayments_account",
        KlarnapaymentsB2b = "klarnapayments_b2b",
        KlarnaPaynow = "klarna_paynow",
        KlarnaAccount = "klarna_account",
        KlarnaB2b = "klarna_b2b"
    }
}
