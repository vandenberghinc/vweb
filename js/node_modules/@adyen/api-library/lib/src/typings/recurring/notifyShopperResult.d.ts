export declare class NotifyShopperResult {
    /**
    * Reference of Pre-debit notification that is displayed to the shopper
    */
    'displayedReference'?: string;
    /**
    * A simple description of the `resultCode`.
    */
    'message'?: string;
    /**
    * The unique reference that is associated with the request.
    */
    'pspReference'?: string;
    /**
    * Reference of Pre-debit notification sent in my the merchant
    */
    'reference'?: string;
    /**
    * The code indicating the status of notification.
    */
    'resultCode'?: string;
    /**
    * The unique reference for the request sent downstream.
    */
    'shopperNotificationReference'?: string;
    /**
    * This is the recurringDetailReference returned in the response when token was created
    */
    'storedPaymentMethodId'?: string;
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
