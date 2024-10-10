import { RemediatingAction } from './remediatingAction';
export declare class VerificationErrorRecursive {
    /**
    * The verification error code.
    */
    'code'?: string;
    /**
    * The verification error message.
    */
    'message'?: string;
    /**
    * The type of verification error.  Possible values: **invalidInput**, **dataMissing**, and **pendingStatus**.
    */
    'type'?: VerificationErrorRecursive.TypeEnum;
    /**
    * The actions that you can take to resolve the verification error.
    */
    'remediatingActions'?: Array<RemediatingAction>;
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
export declare namespace VerificationErrorRecursive {
    enum TypeEnum {
        DataMissing = "dataMissing",
        InvalidInput = "invalidInput",
        PendingStatus = "pendingStatus"
    }
}
