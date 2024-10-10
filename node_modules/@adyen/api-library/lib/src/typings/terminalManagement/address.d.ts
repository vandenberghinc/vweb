export declare class Address {
    'city'?: string;
    'countryCode'?: string;
    'postalCode'?: string;
    'stateOrProvince'?: string;
    'streetAddress'?: string;
    'streetAddress2'?: string;
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
