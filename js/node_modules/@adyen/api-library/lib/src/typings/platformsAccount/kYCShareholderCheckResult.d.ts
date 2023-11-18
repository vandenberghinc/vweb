import { KYCCheckStatusData } from './kYCCheckStatusData';
export declare class KYCShareholderCheckResult {
    /**
    * A list of the checks and their statuses.
    */
    'checks'?: Array<KYCCheckStatusData>;
    /**
    * The unique ID of the legal arrangement to which the shareholder belongs, if applicable.
    */
    'legalArrangementCode'?: string;
    /**
    * The unique ID of the legal arrangement entity to which the shareholder belongs, if applicable.
    */
    'legalArrangementEntityCode'?: string;
    /**
    * The code of the shareholder to which the check applies.
    */
    'shareholderCode'?: string;
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
