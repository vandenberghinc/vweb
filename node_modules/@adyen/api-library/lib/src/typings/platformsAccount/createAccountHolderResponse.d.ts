import { AccountHolderDetails } from './accountHolderDetails';
import { AccountHolderStatus } from './accountHolderStatus';
import { ErrorFieldType } from './errorFieldType';
import { KYCVerificationResult } from './kYCVerificationResult';
export declare class CreateAccountHolderResponse {
    /**
    * The code of a new account created for the account holder.
    */
    'accountCode'?: string;
    /**
    * The code of the new account holder.
    */
    'accountHolderCode'?: string;
    'accountHolderDetails'?: AccountHolderDetails;
    'accountHolderStatus'?: AccountHolderStatus;
    /**
    * The description of the new account holder.
    */
    'description'?: string;
    /**
    * A list of fields that caused the `/createAccountHolder` request to fail.
    */
    'invalidFields'?: Array<ErrorFieldType>;
    /**
    * The type of legal entity of the new account holder.
    */
    'legalEntity'?: CreateAccountHolderResponse.LegalEntityEnum;
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
export declare namespace CreateAccountHolderResponse {
    enum LegalEntityEnum {
        Business = "Business",
        Individual = "Individual",
        NonProfit = "NonProfit",
        Partnership = "Partnership",
        PublicCompany = "PublicCompany"
    }
}
