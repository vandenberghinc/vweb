import { ErrorFieldType } from './errorFieldType';
export declare class GetPciUrlResponse {
    /**
    * Information about any invalid fields.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The reference of a request. Can be used to uniquely identify the request.
    */
    'pspReference'?: string;
    /**
    * The URL to the PCI compliance questionnaire where you should redirect your account holder. This URL must be used within 30 seconds and can only be used once.
    */
    'redirectUrl'?: string;
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
