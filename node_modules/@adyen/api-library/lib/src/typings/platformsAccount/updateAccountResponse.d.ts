import { ErrorFieldType } from './errorFieldType';
import { PayoutScheduleResponse } from './payoutScheduleResponse';
export declare class UpdateAccountResponse {
    /**
    * The code of the account.
    */
    'accountCode': string;
    /**
    * The bankAccountUUID of the bank account held by the account holder to couple the account with. Scheduled payouts in currencies matching the currency of this bank account will be sent to this bank account. Payouts in different currencies will be sent to a matching bank account of the account holder.
    */
    'bankAccountUUID'?: string;
    /**
    * The description of the account.
    */
    'description'?: string;
    /**
    * A list of fields that caused the `/updateAccount` request to fail.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * A set of key and value pairs containing metadata.
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
    'payoutSpeed'?: UpdateAccountResponse.PayoutSpeedEnum;
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
export declare namespace UpdateAccountResponse {
    enum PayoutSpeedEnum {
        Instant = "INSTANT",
        SameDay = "SAME_DAY",
        Standard = "STANDARD"
    }
}
