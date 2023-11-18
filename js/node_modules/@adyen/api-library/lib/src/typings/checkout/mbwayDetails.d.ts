export declare class MbwayDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    'shopperEmail': string;
    'telephoneNumber': string;
    /**
    * **mbway**
    */
    'type'?: MbwayDetails.TypeEnum;
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
export declare namespace MbwayDetails {
    enum TypeEnum {
        Mbway = "mbway"
    }
}
