import { ErrorFieldType } from './errorFieldType';
export declare class PayoutAccountHolderResponse {
    /**
    * The unique ID of the Bank Account to which the payout was made.
    */
    'bankAccountUUID'?: string;
    /**
    * Contains field validation errors that would prevent requests from being processed.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The value supplied by the executing user when initiating the transfer; may be used to link multiple transactions.
    */
    'merchantReference'?: string;
    /**
    * Speed with which payouts for this account are processed. Permitted values: `STANDARD`, `SAME_DAY`.
    */
    'payoutSpeed'?: PayoutAccountHolderResponse.PayoutSpeedEnum;
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
export declare namespace PayoutAccountHolderResponse {
    enum PayoutSpeedEnum {
        Instant = "INSTANT",
        SameDay = "SAME_DAY",
        Standard = "STANDARD"
    }
}
