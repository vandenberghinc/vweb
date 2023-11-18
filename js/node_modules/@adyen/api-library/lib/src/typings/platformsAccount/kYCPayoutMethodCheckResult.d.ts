import { KYCCheckStatusData } from './kYCCheckStatusData';
export declare class KYCPayoutMethodCheckResult {
    /**
    * A list of the checks and their statuses.
    */
    'checks'?: Array<KYCCheckStatusData>;
    /**
    * The unique ID of the payoput method to which the check applies.
    */
    'payoutMethodCode'?: string;
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
