export declare class CreateMerchantRequest {
    /**
    * The unique identifier of the [business line](https://docs.adyen.com/api-explorer/#/legalentity/latest/post/businessLines). Required for an Adyen for Platforms Manage integration.
    */
    'businessLineId'?: string;
    /**
    * The unique identifier of the company account.
    */
    'companyId': string;
    /**
    * Your description for the merchant account, maximum 300 characters.
    */
    'description'?: string;
    /**
    * The unique identifier of the [legal entity](https://docs.adyen.com/api-explorer/#/legalentity/latest/post/legalEntities). Required for an Adyen for Platforms Manage integration.
    */
    'legalEntityId'?: string;
    /**
    * Sets the pricing plan for the merchant account. Required for an Adyen for Platforms Manage integration. Your Adyen contact will provide the values that you can use.
    */
    'pricingPlan'?: string;
    /**
    * Your reference for the merchant account. To make this reference the unique identifier of the merchant account, your Adyen contact can set up a template on your company account. The template can have 6 to 255 characters with upper- and lower-case letters, underscores, and numbers. When your company account has a template, then the `reference` is required and must be unique within the company account.
    */
    'reference'?: string;
    /**
    * List of sales channels that the merchant will process payments with
    */
    'salesChannels'?: Array<string>;
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
