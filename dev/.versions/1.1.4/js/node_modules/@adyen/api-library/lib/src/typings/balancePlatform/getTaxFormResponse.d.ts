export declare class GetTaxFormResponse {
    /**
    * The content of the tax form in Base64 format.
    */
    'content': string;
    /**
    * The content type of the tax form.  Possible values: *  **application/pdf**
    */
    'contentType'?: GetTaxFormResponse.ContentTypeEnum;
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
export declare namespace GetTaxFormResponse {
    enum ContentTypeEnum {
        ApplicationPdf = "application/pdf"
    }
}
