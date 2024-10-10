import { CapabilityProblemEntity } from './capabilityProblemEntity';
import { VerificationError } from './verificationError';
export declare class CapabilityProblem {
    'entity'?: CapabilityProblemEntity;
    /**
    * Contains information about the verification error.
    */
    'verificationErrors'?: Array<VerificationError>;
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
