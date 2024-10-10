export declare class DefendDisputeRequest {
    /**
    * The defense reason code that was selected to defend this dispute.
    */
    'defenseReasonCode': string;
    /**
    * The PSP reference assigned to the dispute.
    */
    'disputePspReference': string;
    /**
    * The merchant account identifier, for which you want to process the dispute transaction.
    */
    'merchantAccountCode': string;
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
