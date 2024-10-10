import { ErrorFieldType } from './errorFieldType';
export declare class DebitAccountHolderResponse {
    /**
    * The code of the account holder.
    */
    'accountHolderCode'?: string;
    /**
    * The Adyen-generated unique alphanumeric identifier (UUID) of the account holder\'s bank account.
    */
    'bankAccountUUID'?: string;
    /**
    * Contains field validation errors that would prevent requests from being processed.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * List of the `reference` values from the `split` array in the request.
    */
    'merchantReferences'?: Array<string>;
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
