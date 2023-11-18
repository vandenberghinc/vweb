export declare class CommonField {
    /**
    * Name of the field. For example, Name of External Platform.
    */
    'name'?: string;
    /**
    * Version of the field. For example, Version of External Platform.
    */
    'version'?: string;
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
