export declare class SubjectErasureByPspReferenceRequest {
    /**
    * Set this to **true** if you want to delete shopper-related data, even if the shopper has an existing recurring transaction. This only deletes the shopper-related data for the specific payment, but does not cancel the existing recurring transaction.
    */
    'forceErasure'?: boolean;
    /**
    * Your merchant account
    */
    'merchantAccount'?: string;
    /**
    * The PSP reference of the payment. We will delete all shopper-related data for this payment.
    */
    'pspReference'?: string;
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
