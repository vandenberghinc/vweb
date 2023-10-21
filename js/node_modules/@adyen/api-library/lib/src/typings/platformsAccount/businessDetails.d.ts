import { ShareholderContact } from './shareholderContact';
import { SignatoryContact } from './signatoryContact';
import { UltimateParentCompany } from './ultimateParentCompany';
export declare class BusinessDetails {
    /**
    * The registered name of the company (if it differs from the legal name of the company).
    */
    'doingBusinessAs'?: string;
    /**
    * The legal name of the company.
    */
    'legalBusinessName'?: string;
    /**
    * Information about the parent public company. Required if the account holder is 100% owned by a publicly listed company.
    */
    'listedUltimateParentCompany'?: Array<UltimateParentCompany>;
    /**
    * The registration number of the company.
    */
    'registrationNumber'?: string;
    /**
    * Array containing information about individuals associated with the account holder either through ownership or control. For details about how you can identify them, refer to [our verification guide](https://docs.adyen.com/marketplaces-and-platforms/classic/verification-process#identify-ubos).
    */
    'shareholders'?: Array<ShareholderContact>;
    /**
    * Signatories associated with the company. Each array entry should represent one signatory.
    */
    'signatories'?: Array<SignatoryContact>;
    /**
    * Market Identifier Code (MIC).
    */
    'stockExchange'?: string;
    /**
    * International Securities Identification Number (ISIN).
    */
    'stockNumber'?: string;
    /**
    * Stock Ticker symbol.
    */
    'stockTicker'?: string;
    /**
    * The tax ID of the company.
    */
    'taxId'?: string;
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
