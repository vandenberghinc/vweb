export declare class ReceiptPrinting {
    /**
    * Print a merchant receipt when the payment is approved.
    */
    'merchantApproved'?: boolean;
    /**
    * Print a merchant receipt when the transaction is cancelled.
    */
    'merchantCancelled'?: boolean;
    /**
    * Print a merchant receipt when capturing the payment is approved.
    */
    'merchantCaptureApproved'?: boolean;
    /**
    * Print a merchant receipt when capturing the payment is refused.
    */
    'merchantCaptureRefused'?: boolean;
    /**
    * Print a merchant receipt when the refund is approved.
    */
    'merchantRefundApproved'?: boolean;
    /**
    * Print a merchant receipt when the refund is refused.
    */
    'merchantRefundRefused'?: boolean;
    /**
    * Print a merchant receipt when the payment is refused.
    */
    'merchantRefused'?: boolean;
    /**
    * Print a merchant receipt when a previous transaction is voided.
    */
    'merchantVoid'?: boolean;
    /**
    * Print a shopper receipt when the payment is approved.
    */
    'shopperApproved'?: boolean;
    /**
    * Print a shopper receipt when the transaction is cancelled.
    */
    'shopperCancelled'?: boolean;
    /**
    * Print a shopper receipt when capturing the payment is approved.
    */
    'shopperCaptureApproved'?: boolean;
    /**
    * Print a shopper receipt when capturing the payment is refused.
    */
    'shopperCaptureRefused'?: boolean;
    /**
    * Print a shopper receipt when the refund is approved.
    */
    'shopperRefundApproved'?: boolean;
    /**
    * Print a shopper receipt when the refund is refused.
    */
    'shopperRefundRefused'?: boolean;
    /**
    * Print a shopper receipt when the payment is refused.
    */
    'shopperRefused'?: boolean;
    /**
    * Print a shopper receipt when a previous transaction is voided.
    */
    'shopperVoid'?: boolean;
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
