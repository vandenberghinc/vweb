export declare class UtilityRequest {
    /**
    * The list of origin domains, for which origin keys are requested.
    */
    'originDomains': Array<string>;
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
