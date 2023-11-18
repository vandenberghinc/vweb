import { KYCCheckStatusData } from './kYCCheckStatusData';
export declare class KYCCheckResult {
    /**
    * A list of the checks and their statuses.
    */
    'checks'?: Array<KYCCheckStatusData>;
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
