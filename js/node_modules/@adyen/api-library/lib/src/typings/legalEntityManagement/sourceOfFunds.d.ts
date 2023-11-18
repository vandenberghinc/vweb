export declare class SourceOfFunds {
    /**
    * The unique identifier of the business line that will be the source of funds.This must be a business line for a **receivePayments** or **receiveFromPlatformPayments** capability.
    */
    'acquiringBusinessLineId'?: string;
    /**
    * Indicates whether the funds are coming from transactions processed by Adyen. If **false**, a `description` is required.
    */
    'adyenProcessedFunds'?: boolean;
    /**
    * Text describing the source of funds. For example, for `type` **business**, provide a description of where the business transactions come from, such as payments through bank transfer. Required when `adyenProcessedFunds` is **false**.
    */
    'description'?: string;
    /**
    * The type of the source of funds. Possible value: **business**.
    */
    'type'?: SourceOfFunds.TypeEnum;
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
export declare namespace SourceOfFunds {
    enum TypeEnum {
        Business = "business"
    }
}
