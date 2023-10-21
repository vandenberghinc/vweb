export declare class Company {
    /**
    * The company website\'s home page.
    */
    'homepage'?: string;
    /**
    * The company name.
    */
    'name'?: string;
    /**
    * Registration number of the company.
    */
    'registrationNumber'?: string;
    /**
    * Registry location of the company.
    */
    'registryLocation'?: string;
    /**
    * Tax ID of the company.
    */
    'taxId'?: string;
    /**
    * The company type.
    */
    'type'?: string;
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
