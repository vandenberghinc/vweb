import { InvalidField } from './invalidField';
export declare class RestServiceError {
    /**
    * A human-readable explanation specific to this occurrence of the problem.
    */
    'detail': string;
    /**
    * A code that identifies the problem type.
    */
    'errorCode': string;
    /**
    * A unique URI that identifies the specific occurrence of the problem.
    */
    'instance'?: string;
    /**
    * Detailed explanation of each validation error, when applicable.
    */
    'invalidFields'?: Array<InvalidField>;
    /**
    * A unique reference for the request, essentially the same as `pspReference`.
    */
    'requestId'?: string;
    'response'?: object;
    /**
    * The HTTP status code.
    */
    'status': number;
    /**
    * A short, human-readable summary of the problem type.
    */
    'title': string;
    /**
    * A URI that identifies the problem type, pointing to human-readable documentation on this problem type.
    */
    'type': string;
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
