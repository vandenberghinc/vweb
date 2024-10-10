import { KYCCheckResult } from './kYCCheckResult';
import { KYCLegalArrangementCheckResult } from './kYCLegalArrangementCheckResult';
import { KYCLegalArrangementEntityCheckResult } from './kYCLegalArrangementEntityCheckResult';
import { KYCPayoutMethodCheckResult } from './kYCPayoutMethodCheckResult';
import { KYCShareholderCheckResult } from './kYCShareholderCheckResult';
import { KYCSignatoryCheckResult } from './kYCSignatoryCheckResult';
import { KYCUltimateParentCompanyCheckResult } from './kYCUltimateParentCompanyCheckResult';
export declare class KYCVerificationResult {
    'accountHolder'?: KYCCheckResult;
    /**
    * The results of the checks on the legal arrangements.
    */
    'legalArrangements'?: Array<KYCLegalArrangementCheckResult>;
    /**
    * The results of the checks on the legal arrangement entities.
    */
    'legalArrangementsEntities'?: Array<KYCLegalArrangementEntityCheckResult>;
    /**
    * The results of the checks on the payout methods.
    */
    'payoutMethods'?: Array<KYCPayoutMethodCheckResult>;
    /**
    * The results of the checks on the shareholders.
    */
    'shareholders'?: Array<KYCShareholderCheckResult>;
    /**
    * The results of the checks on the signatories.
    */
    'signatories'?: Array<KYCSignatoryCheckResult>;
    /**
    * The result of the check on the Ultimate Parent Company.
    */
    'ultimateParentCompany'?: Array<KYCUltimateParentCompanyCheckResult>;
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
