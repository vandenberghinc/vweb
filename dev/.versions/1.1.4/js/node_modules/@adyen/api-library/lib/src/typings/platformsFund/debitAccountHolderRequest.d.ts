import { Amount } from './amount';
import { Split } from './split';
export declare class DebitAccountHolderRequest {
    /**
    * The code of the account holder.
    */
    'accountHolderCode': string;
    'amount': Amount;
    /**
    * The Adyen-generated unique alphanumeric identifier (UUID) of the account holder\'s bank account.
    */
    'bankAccountUUID': string;
    /**
    * A description of the direct debit. Maximum length: 35 characters.  Allowed characters: **a-z**, **A-Z**, **0-9**, and special characters **_/?:().,\'+ \";**.
    */
    'description'?: string;
    /**
    * Your merchant account.
    */
    'merchantAccount': string;
    /**
    * Contains instructions on how to split the funds between the accounts in your platform. The request must have at least one split item.
    */
    'splits': Array<Split>;
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
