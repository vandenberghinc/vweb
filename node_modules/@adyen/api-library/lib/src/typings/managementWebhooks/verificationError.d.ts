import { RemediatingAction } from './remediatingAction';
import { VerificationErrorRecursive } from './verificationErrorRecursive';
export declare class VerificationError {
    /**
    * The verification error code.
    */
    'code'?: string;
    /**
    * The verification error message.
    */
    'message'?: string;
    /**
    * The actions that you can take to resolve the verification error.
    */
    'remediatingActions'?: Array<RemediatingAction>;
    /**
    * More granular information about the verification error.
    */
    'subErrors'?: Array<VerificationErrorRecursive>;
    /**
    * The type of verification error.  Possible values: **invalidInput**, **dataMissing**, and **pendingStatus**.
    */
    'type'?: VerificationError.TypeEnum;
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
export declare namespace VerificationError {
    enum TypeEnum {
        DataMissing = "dataMissing",
        InvalidInput = "invalidInput",
        PendingStatus = "pendingStatus"
    }
}
