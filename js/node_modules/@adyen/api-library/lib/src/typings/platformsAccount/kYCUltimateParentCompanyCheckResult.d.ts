import { KYCCheckStatusData } from './kYCCheckStatusData';
export declare class KYCUltimateParentCompanyCheckResult {
    /**
    * A list of the checks and their statuses.
    */
    'checks'?: Array<KYCCheckStatusData>;
    /**
    * The code of the Ultimate Parent Company to which the check applies.
    */
    'ultimateParentCompanyCode'?: string;
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
