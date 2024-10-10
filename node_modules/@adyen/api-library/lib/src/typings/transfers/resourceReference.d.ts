export declare class ResourceReference {
    /**
    * The description of the resource.
    */
    'description'?: string;
    /**
    * The unique identifier of the resource.
    */
    'id'?: string;
    /**
    * The reference for the resource.
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
