export declare class PaymentVerificationRequest {
    /**
    * Encrypted and signed payment result data. You should receive this value from the Checkout SDK after the shopper completes the payment.
    */
    'payload': string;
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
