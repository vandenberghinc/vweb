export declare class BirthData {
    /**
    * The individual\'s date of birth, in YYYY-MM-DD format.
    */
    'dateOfBirth'?: string;
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
