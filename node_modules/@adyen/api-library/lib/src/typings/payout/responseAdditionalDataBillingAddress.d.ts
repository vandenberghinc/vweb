export declare class ResponseAdditionalDataBillingAddress {
    /**
    * The billing address city passed in the payment request.
    */
    'billingAddress_city'?: string;
    /**
    * The billing address country passed in the payment request.  Example: NL
    */
    'billingAddress_country'?: string;
    /**
    * The billing address house number or name passed in the payment request.
    */
    'billingAddress_houseNumberOrName'?: string;
    /**
    * The billing address postal code passed in the payment request.  Example: 1011 DJ
    */
    'billingAddress_postalCode'?: string;
    /**
    * The billing address state or province passed in the payment request.  Example: NH
    */
    'billingAddress_stateOrProvince'?: string;
    /**
    * The billing address street passed in the payment request.
    */
    'billingAddress_street'?: string;
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
