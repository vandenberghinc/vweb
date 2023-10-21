export declare class IdName {
    /**
    * The identifier of the terminal model.
    */
    'id'?: string;
    /**
    * The name of the terminal model.
    */
    'name'?: string;
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
