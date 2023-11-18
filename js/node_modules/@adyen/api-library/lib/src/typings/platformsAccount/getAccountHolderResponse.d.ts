import { Account } from './account';
import { AccountHolderDetails } from './accountHolderDetails';
import { AccountHolderStatus } from './accountHolderStatus';
import { ErrorFieldType } from './errorFieldType';
import { KYCVerificationResult } from './kYCVerificationResult';
import { MigrationData } from './migrationData';
export declare class GetAccountHolderResponse {
    /**
    * The code of the account holder.
    */
    'accountHolderCode'?: string;
    'accountHolderDetails'?: AccountHolderDetails;
    'accountHolderStatus'?: AccountHolderStatus;
    /**
    * A list of the accounts under the account holder.
    */
    'accounts'?: Array<Account>;
    /**
    * The description of the account holder.
    */
    'description'?: string;
    /**
    * Contains field validation errors that would prevent requests from being processed.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The legal entity of the account holder.
    */
    'legalEntity'?: GetAccountHolderResponse.LegalEntityEnum;
    'migrationData'?: MigrationData;
    /**
    * The three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes), with which the prospective account holder primarily deals.
    */
    'primaryCurrency'?: string;
    /**
    * The reference of a request. Can be used to uniquely identify the request.
    */
    'pspReference'?: string;
    /**
    * The result code.
    */
    'resultCode'?: string;
    /**
    * The time that shows how up to date is the information in the response.
    */
    'systemUpToDateTime'?: Date;
    'verification'?: KYCVerificationResult;
    /**
    * The identifier of the profile that applies to this entity.
    */
    'verificationProfile'?: string;
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
export declare namespace GetAccountHolderResponse {
    enum LegalEntityEnum {
        Business = "Business",
        Individual = "Individual",
        NonProfit = "NonProfit",
        Partnership = "Partnership",
        PublicCompany = "PublicCompany"
    }
}
