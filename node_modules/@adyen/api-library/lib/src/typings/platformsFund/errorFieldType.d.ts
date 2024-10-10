import { FieldType } from './fieldType';
export declare class ErrorFieldType {
    /**
    * The validation error code.
    */
    'errorCode'?: number;
    /**
    * A description of the validation error.
    */
    'errorDescription'?: string;
    'fieldType'?: FieldType;
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
