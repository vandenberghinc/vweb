export declare class UndefinedBeneficiary {
    /**
    * The details of the undefined beneficiary.
    */
    'description'?: string;
    /**
    * The reference of the undefined beneficiary.
    */
    'reference'?: string;
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
