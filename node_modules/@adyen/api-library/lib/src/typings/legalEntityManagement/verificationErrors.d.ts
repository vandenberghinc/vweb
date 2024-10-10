import { CapabilityProblem } from './capabilityProblem';
export declare class VerificationErrors {
    /**
    * List of the verification errors.
    */
    'problems'?: Array<CapabilityProblem>;
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
