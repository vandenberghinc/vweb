import { PayoutScheduleResponse } from './payoutScheduleResponse';
export declare class Account {
    /**
    * The code of the account.
    */
    'accountCode'?: string;
    /**
    * The bankAccountUUID of the bank account held by the account holder to couple the account with. Scheduled payouts in currencies matching the currency of this bank account will be sent to this bank account. Payouts in different currencies will be sent to a matching bank account of the account holder.
    */
    'bankAccountUUID'?: string;
    /**
    * The beneficiary of the account.
    */
    'beneficiaryAccount'?: string;
    /**
    * The reason that a beneficiary has been set up for this account. This may have been supplied during the setup of a beneficiary at the discretion of the executing user.
    */
    'beneficiaryMerchantReference'?: string;
    /**
    * A description of the account.
    */
    'description'?: string;
    /**
    * A set of key and value pairs for general use by the merchant. The keys do not have specific names and may be used for storing miscellaneous data as desired. > Note that during an update of metadata, the omission of existing key-value pairs will result in the deletion of those key-value pairs.
    */
    'metadata'?: {
        [key: string]: string;
    };
    /**
    * The payout method code held by the account holder to couple the account with. Scheduled card payouts will be sent using this payout method code.
    */
    'payoutMethodCode'?: string;
    'payoutSchedule'?: PayoutScheduleResponse;
    /**
    * Speed with which payouts for this account are processed. Permitted values: `STANDARD`, `SAME_DAY`.
    */
    'payoutSpeed'?: Account.PayoutSpeedEnum;
    /**
    * The status of the account. Possible values: `Active`, `Inactive`, `Suspended`, `Closed`.
    */
    'status'?: string;
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
export declare namespace Account {
    enum PayoutSpeedEnum {
        Instant = "INSTANT",
        SameDay = "SAME_DAY",
        Standard = "STANDARD"
    }
}
