export declare class AdditionalCommission {
    /**
    * Unique identifier of the balance account to which the additional commission is booked.
    */
    'balanceAccountId'?: string;
    /**
    * A fixed commission fee, in minor units.
    */
    'fixedAmount'?: number;
    /**
    * A variable commission fee, in basis points.
    */
    'variablePercentage'?: number;
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
