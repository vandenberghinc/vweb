import { DefenseReason } from './defenseReason';
import { DisputeServiceResult } from './disputeServiceResult';
export declare class DefenseReasonsResponse {
    /**
    * The defense reasons that can be used to defend the dispute.
    */
    'defenseReasons'?: Array<DefenseReason>;
    'disputeServiceResult': DisputeServiceResult;
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
