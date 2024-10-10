export declare class ModificationResult {
    /**
    * This field contains additional data, which may be returned in a particular modification response.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    /**
    * Adyen\'s 16-character string reference associated with the transaction/request. This value is globally unique; quote it when communicating with us about this request.
    */
    'pspReference': string;
    /**
    * Indicates if the modification request has been received for processing.
    */
    'response': ModificationResult.ResponseEnum;
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
export declare namespace ModificationResult {
    enum ResponseEnum {
        CaptureReceived = "[capture-received]",
        CancelReceived = "[cancel-received]",
        RefundReceived = "[refund-received]",
        CancelOrRefundReceived = "[cancelOrRefund-received]",
        AdjustAuthorisationReceived = "[adjustAuthorisation-received]",
        DonationReceived = "[donation-received]",
        TechnicalCancelReceived = "[technical-cancel-received]",
        VoidPendingRefundReceived = "[voidPendingRefund-received]"
    }
}
