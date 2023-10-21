import { Amount } from './amount';
export declare class PayoutAccountHolderRequest {
    /**
    * The code of the account from which the payout is to be made.
    */
    'accountCode': string;
    /**
    * The code of the Account Holder who owns the account from which the payout is to be made. The Account Holder is the party to which the payout will be made.
    */
    'accountHolderCode': string;
    'amount'?: Amount;
    /**
    * The unique ID of the Bank Account held by the Account Holder to which the payout is to be made. If left blank, a bank account is automatically selected.
    */
    'bankAccountUUID'?: string;
    /**
    * A description of the payout. Maximum 200 characters. Allowed: **abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/?:().,\'+ \";**
    */
    'description'?: string;
    /**
    * A value that can be supplied at the discretion of the executing user in order to link multiple transactions to one another.
    */
    'merchantReference'?: string;
    /**
    * The unique ID of the payout method held by the Account Holder to which the payout is to be made. If left blank, a payout instrument is automatically selected.
    */
    'payoutMethodCode'?: string;
    /**
    * Speed with which payouts for this account are processed. Permitted values: `STANDARD`, `SAME_DAY`.
    */
    'payoutSpeed'?: PayoutAccountHolderRequest.PayoutSpeedEnum;
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
export declare namespace PayoutAccountHolderRequest {
    enum PayoutSpeedEnum {
        Instant = "INSTANT",
        SameDay = "SAME_DAY",
        Standard = "STANDARD"
    }
}
