export declare class RepaymentTerm {
    /**
    * The estimated term for repaying the grant, in days.
    */
    'estimatedDays': number;
    /**
    * The maximum term for repaying the grant, in days. Only applies when `contractType` is **loan**.
    */
    'maximumDays'?: number;
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
