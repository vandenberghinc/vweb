export declare class UpdatePaymentLinkRequest {
    /**
    * Status of the payment link. Possible values: * **expired**
    */
    'status': UpdatePaymentLinkRequest.StatusEnum;
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
export declare namespace UpdatePaymentLinkRequest {
    enum StatusEnum {
        Expired = "expired"
    }
}
