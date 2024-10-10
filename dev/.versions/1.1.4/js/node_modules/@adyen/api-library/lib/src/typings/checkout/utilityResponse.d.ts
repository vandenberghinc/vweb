export declare class UtilityResponse {
    /**
    * The list of origin keys for all requested domains. For each list item, the key is the domain and the value is the origin key.
    */
    'originKeys'?: {
        [key: string]: string;
    };
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
