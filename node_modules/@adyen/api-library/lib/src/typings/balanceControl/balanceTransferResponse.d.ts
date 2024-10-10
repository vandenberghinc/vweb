import { Amount } from './amount';
export declare class BalanceTransferResponse {
    'amount': Amount;
    /**
    * The date when the balance transfer was requested.
    */
    'createdAt': Date;
    /**
    * A human-readable description for the transfer. You can use alphanumeric characters and hyphens. We recommend sending a maximum of 140 characters, otherwise the description may be truncated.
    */
    'description'?: string;
    /**
    * The unique identifier of the source merchant account from which funds are deducted.
    */
    'fromMerchant': string;
    /**
    * Adyen\'s 16-character string reference associated with the balance transfer.
    */
    'pspReference': string;
    /**
    * A reference for the balance transfer. If you don\'t provide this in the request, Adyen generates a unique reference. Maximum length: 80 characters.
    */
    'reference'?: string;
    /**
    * The status of the balance transfer. Possible values: **transferred**, **failed**, **error**, and **notEnoughBalance**.
    */
    'status': BalanceTransferResponse.StatusEnum;
    /**
    * The unique identifier of the destination merchant account from which funds are transferred.
    */
    'toMerchant': string;
    /**
    * The type of balance transfer. Possible values: **tax**, **fee**, **terminalSale**, **credit**, **debit**, and **adjustment**.
    */
    'type': BalanceTransferResponse.TypeEnum;
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
export declare namespace BalanceTransferResponse {
    enum StatusEnum {
        Error = "error",
        Failed = "failed",
        NotEnoughBalance = "notEnoughBalance",
        Transferred = "transferred"
    }
    enum TypeEnum {
        Tax = "tax",
        Fee = "fee",
        TerminalSale = "terminalSale",
        Credit = "credit",
        Debit = "debit",
        Adjustment = "adjustment"
    }
}
