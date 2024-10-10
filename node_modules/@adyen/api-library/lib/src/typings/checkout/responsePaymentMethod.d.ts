export declare class ResponsePaymentMethod {
    /**
    * The card brand that the shopper used to pay. Only returned if `paymentMethod.type` is **scheme**.
    */
    'brand'?: string;
    /**
    * The `paymentMethod.type` value used in the request.
    */
    'type'?: string;
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
