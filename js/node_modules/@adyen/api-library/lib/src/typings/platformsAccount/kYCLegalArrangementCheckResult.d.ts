import { KYCCheckStatusData } from './kYCCheckStatusData';
export declare class KYCLegalArrangementCheckResult {
    /**
    * A list of the checks and their statuses.
    */
    'checks'?: Array<KYCCheckStatusData>;
    /**
    * The unique ID of the legal arrangement to which the check applies.
    */
    'legalArrangementCode'?: string;
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
