export declare class ZipDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * Set this to **true** if the shopper would like to pick up and collect their order, instead of having the goods delivered to them.
    */
    'clickAndCollect'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'recurringDetailReference'?: string;
    /**
    * This is the `recurringDetailReference` returned in the response when you created the token.
    */
    'storedPaymentMethodId'?: string;
    /**
    * **zip**
    */
    'type'?: ZipDetails.TypeEnum;
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
export declare namespace ZipDetails {
    enum TypeEnum {
        Zip = "zip",
        ZipPos = "zip_pos"
    }
}
