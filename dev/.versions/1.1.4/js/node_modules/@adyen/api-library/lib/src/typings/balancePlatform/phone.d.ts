export declare class Phone {
    /**
    * The full phone number provided as a single string.  For example, **\"0031 6 11 22 33 44\"**, **\"+316/1122-3344\"**,    or **\"(0031) 611223344\"**.
    */
    'number': string;
    /**
    * Type of phone number. Possible values:  **Landline**, **Mobile**.
    */
    'type': Phone.TypeEnum;
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
export declare namespace Phone {
    enum TypeEnum {
        Landline = "landline",
        Mobile = "mobile"
    }
}
