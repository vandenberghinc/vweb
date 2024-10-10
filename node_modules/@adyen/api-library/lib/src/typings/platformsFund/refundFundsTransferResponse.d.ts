import { ErrorFieldType } from './errorFieldType';
export declare class RefundFundsTransferResponse {
    /**
    * Contains field validation errors that would prevent requests from being processed.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The value supplied by the executing user when initiating the transfer refund; may be used to link multiple transactions.
    */
    'merchantReference'?: string;
    /**
    * The message of the response.
    */
    'message'?: string;
    /**
    * A PSP reference of the original fund transfer.
    */
    'originalReference'?: string;
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
