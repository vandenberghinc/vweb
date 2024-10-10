export declare class AddressRequirement {
    /**
    * Specifies the required address related fields for a particular route.
    */
    'description'?: string;
    /**
    * List of address fields.
    */
    'requiredAddressFields'?: Array<AddressRequirement.RequiredAddressFieldsEnum>;
    /**
    * **addressRequirement**
    */
    'type': AddressRequirement.TypeEnum;
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
export declare namespace AddressRequirement {
    enum RequiredAddressFieldsEnum {
        City = "city",
        Country = "country",
        Line1 = "line1",
        PostalCode = "postalCode",
        StateOrProvince = "stateOrProvince"
    }
    enum TypeEnum {
        AddressRequirement = "addressRequirement"
    }
}
