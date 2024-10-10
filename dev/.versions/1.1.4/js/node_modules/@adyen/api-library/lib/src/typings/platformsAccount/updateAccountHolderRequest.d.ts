import { AccountHolderDetails } from './accountHolderDetails';
export declare class UpdateAccountHolderRequest {
    /**
    * The code of the Account Holder to be updated.
    */
    'accountHolderCode': string;
    'accountHolderDetails'?: AccountHolderDetails;
    /**
    * A description of the account holder, maximum 256 characters. You can use alphanumeric characters (A-Z, a-z, 0-9), white spaces, and underscores `_`.
    */
    'description'?: string;
    /**
    * The legal entity type of the account holder. This determines the information that should be provided in the request.  Possible values: **Business**, **Individual**, or **NonProfit**.  * If set to **Business** or **NonProfit**, then `accountHolderDetails.businessDetails` must be provided, with at least one entry in the `accountHolderDetails.businessDetails.shareholders` list.  * If set to **Individual**, then `accountHolderDetails.individualDetails` must be provided.
    */
    'legalEntity'?: UpdateAccountHolderRequest.LegalEntityEnum;
    /**
    * The primary three-character [ISO currency code](https://docs.adyen.com/development-resources/currency-codes), to which the account holder should be updated.
    */
    'primaryCurrency'?: string;
    /**
    * The processing tier to which the Account Holder should be updated. >The processing tier can not be lowered through this request.  >Required if accountHolderDetails are not provided.
    */
    'processingTier'?: number;
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
export declare namespace UpdateAccountHolderRequest {
    enum LegalEntityEnum {
        Business = "Business",
        Individual = "Individual",
        NonProfit = "NonProfit",
        Partnership = "Partnership",
        PublicCompany = "PublicCompany"
    }
}
