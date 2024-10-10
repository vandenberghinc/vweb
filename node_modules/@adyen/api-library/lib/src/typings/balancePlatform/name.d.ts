export declare class Name {
    /**
    * The first name.
    */
    'firstName': string;
    /**
    * The last name.
    */
    'lastName': string;
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
