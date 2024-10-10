import { Amount } from './amount';
export declare class StoredValueBalanceCheckResponse {
    'currentBalance'?: Amount;
    /**
    * Adyen\'s 16-character string reference associated with the transaction/request. This value is globally unique; quote it when communicating with us about this request.
    */
    'pspReference'?: string;
    /**
    * If the transaction is refused or an error occurs, this field holds Adyen\'s mapped reason for the refusal or a description of the error.  When a transaction fails, the authorisation response includes `resultCode` and `refusalReason` values.
    */
    'refusalReason'?: string;
    /**
    * The result of the payment. Possible values:  * **Success** – The operation has been completed successfully.  * **Refused** – The operation was refused. The reason is given in the `refusalReason` field.  * **Error** – There was an error when the operation was processed. The reason is given in the `refusalReason` field.  * **NotEnoughBalance** – The amount on the payment method is lower than the amount given in the request. Only applicable to balance checks.
    */
    'resultCode'?: StoredValueBalanceCheckResponse.ResultCodeEnum;
    /**
    * Raw refusal reason received from the third party, where available
    */
    'thirdPartyRefusalReason'?: string;
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
export declare namespace StoredValueBalanceCheckResponse {
    enum ResultCodeEnum {
        Success = "Success",
        Refused = "Refused",
        Error = "Error",
        NotEnoughBalance = "NotEnoughBalance"
    }
}
