export declare class InvalidField {
    /**
    * Description of the validation error.
    */
    'message': string;
    /**
    * The field that has an invalid value.
    */
    'name': string;
    /**
    * The invalid value.
    */
    'value': string;
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
