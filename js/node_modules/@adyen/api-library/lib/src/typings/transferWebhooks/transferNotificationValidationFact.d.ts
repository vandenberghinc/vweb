export declare class TransferNotificationValidationFact {
    /**
    * The evaluation result of the validation fact.
    */
    'result'?: string;
    /**
    * The type of the validation fact.
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
