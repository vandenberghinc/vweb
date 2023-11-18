export declare class ThreeDSAvailabilityRequest {
    /**
    * This field contains additional data, which may be required for a particular request.  The `additionalData` object consists of entries, each of which includes the key and value.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    /**
    * List of brands.
    */
    'brands'?: Array<string>;
    /**
    * Card number or BIN.
    */
    'cardNumber'?: string;
    /**
    * The merchant account identifier.
    */
    'merchantAccount': string;
    /**
    * A recurring detail reference corresponding to a card.
    */
    'recurringDetailReference'?: string;
    /**
    * The shopper\'s reference to uniquely identify this shopper (e.g. user ID or account ID).
    */
    'shopperReference'?: string;
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
