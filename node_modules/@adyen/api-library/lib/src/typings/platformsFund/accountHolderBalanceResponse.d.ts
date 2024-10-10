import { AccountDetailBalance } from './accountDetailBalance';
import { DetailBalance } from './detailBalance';
import { ErrorFieldType } from './errorFieldType';
export declare class AccountHolderBalanceResponse {
    /**
    * A list of each account and their balances.
    */
    'balancePerAccount'?: Array<AccountDetailBalance>;
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
    'totalBalance'?: DetailBalance;
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
