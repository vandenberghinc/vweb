export declare class SubjectErasureResponse {
    /**
    * The result of this operation.
    */
    'result'?: SubjectErasureResponse.ResultEnum;
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
export declare namespace SubjectErasureResponse {
    enum ResultEnum {
        ActiveRecurringTokenExists = "ACTIVE_RECURRING_TOKEN_EXISTS",
        AlreadyProcessed = "ALREADY_PROCESSED",
        PaymentNotFound = "PAYMENT_NOT_FOUND",
        Success = "SUCCESS"
    }
}
