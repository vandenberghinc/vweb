import { ErrorFieldType } from './errorFieldType';
export declare class GetTaxFormResponse {
    /**
    * The content of the tax form in the Base64 binary format.
    */
    'content'?: string;
    /**
    * The content type of the tax form.
    */
    'contentType'?: string;
    /**
    * Contains field validation errors that would prevent requests from being processed.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The reference of a request. Can be used to uniquely identify the request.
    */
    'pspReference'?: string;
    /**
    * The result code.
    */
    'resultCode'?: string;
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
