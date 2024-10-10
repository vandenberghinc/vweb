export declare class ShopperInput {
    /**
    * Specifies visibility of billing address fields.  Permitted values: * editable * hidden * readOnly
    */
    'billingAddress'?: ShopperInput.BillingAddressEnum;
    /**
    * Specifies visibility of delivery address fields.  Permitted values: * editable * hidden * readOnly
    */
    'deliveryAddress'?: ShopperInput.DeliveryAddressEnum;
    /**
    * Specifies visibility of personal details.  Permitted values: * editable * hidden * readOnly
    */
    'personalDetails'?: ShopperInput.PersonalDetailsEnum;
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
export declare namespace ShopperInput {
    enum BillingAddressEnum {
        Editable = "editable",
        Hidden = "hidden",
        ReadOnly = "readOnly"
    }
    enum DeliveryAddressEnum {
        Editable = "editable",
        Hidden = "hidden",
        ReadOnly = "readOnly"
    }
    enum PersonalDetailsEnum {
        Editable = "editable",
        Hidden = "hidden",
        ReadOnly = "readOnly"
    }
}
