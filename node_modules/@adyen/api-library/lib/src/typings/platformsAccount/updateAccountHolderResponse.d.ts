import { AccountHolderDetails } from './accountHolderDetails';
import { AccountHolderStatus } from './accountHolderStatus';
import { ErrorFieldType } from './errorFieldType';
import { KYCVerificationResult } from './kYCVerificationResult';
export declare class UpdateAccountHolderResponse {
    /**
    * The code of the account holder.
    */
    'accountHolderCode'?: string;
    'accountHolderDetails'?: AccountHolderDetails;
    'accountHolderStatus'?: AccountHolderStatus;
    /**
    * The description of the account holder.
    */
    'description'?: string;
    /**
    * in case the account holder has not been updated, contains account holder fields, that did not pass the validation.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The legal entity of the account holder.
    */
    'legalEntity'?: UpdateAccountHolderResponse.LegalEntityEnum;
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
export declare namespace UpdateAccountHolderResponse {
    enum LegalEntityEnum {
        Business = "Business",
        Individual = "Individual",
        NonProfit = "NonProfit",
        Partnership = "Partnership",
        PublicCompany = "PublicCompany"
    }
}
