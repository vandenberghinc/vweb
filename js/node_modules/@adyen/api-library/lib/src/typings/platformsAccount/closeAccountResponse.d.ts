import { ErrorFieldType } from './errorFieldType';
export declare class CloseAccountResponse {
    /**
    * The account code of the account that is closed.
    */
    'accountCode'?: string;
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
    /**
    * The new status of the account. >Permitted values: `Active`, `Inactive`, `Suspended`, `Closed`.
    */
    'status'?: CloseAccountResponse.StatusEnum;
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
export declare namespace CloseAccountResponse {
    enum StatusEnum {
        Active = "Active",
        Closed = "Closed",
        Inactive = "Inactive",
        Suspended = "Suspended"
    }
}
