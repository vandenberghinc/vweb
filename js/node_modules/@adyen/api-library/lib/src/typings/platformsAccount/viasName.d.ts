export declare class ViasName {
    /**
    * The first name.
    */
    'firstName'?: string;
    /**
    * The gender. >The following values are permitted: `MALE`, `FEMALE`, `UNKNOWN`.
    */
    'gender'?: ViasName.GenderEnum;
    /**
    * The name\'s infix, if applicable. >A maximum length of twenty (20) characters is imposed.
    */
    'infix'?: string;
    /**
    * The last name.
    */
    'lastName'?: string;
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
export declare namespace ViasName {
    enum GenderEnum {
        Male = "MALE",
        Female = "FEMALE",
        Unknown = "UNKNOWN"
    }
}
