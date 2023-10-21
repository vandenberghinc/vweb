export declare class AccountSupportingEntityCapability {
    /**
    * Indicates whether the supporting entity capability is allowed. Adyen sets this to **true** if the verification is successful and the account holder is permitted to use the capability.
    */
    'allowed'?: boolean;
    /**
    * The capability level that is allowed for the account holder.  Possible values: **notApplicable**, **low**, **medium**, **high**.
    */
    'allowedLevel'?: AccountSupportingEntityCapability.AllowedLevelEnum;
    /**
    * Indicates whether the capability is enabled. If **false**, the capability is temporarily disabled for the account holder.
    */
    'enabled'?: boolean;
    /**
    * The ID of the supporting entity.
    */
    'id'?: string;
    /**
    * Indicates whether the capability is requested. To check whether the account holder is permitted to use the capability, refer to the `allowed` field.
    */
    'requested'?: boolean;
    /**
    * The requested level of the capability. Some capabilities, such as those used in [card issuing](https://docs.adyen.com/issuing/add-capabilities#capability-levels), have different levels. Levels increase the capability, but also require additional checks and increased monitoring.  Possible values: **notApplicable**, **low**, **medium**, **high**.
    */
    'requestedLevel'?: AccountSupportingEntityCapability.RequestedLevelEnum;
    /**
    * The status of the verification checks for the supporting entity capability.  Possible values:  * **pending**: Adyen is running the verification.  * **invalid**: The verification failed. Check if the `errors` array contains more information.  * **valid**: The verification has been successfully completed.  * **rejected**: Adyen has verified the information, but found reasons to not allow the capability.
    */
    'verificationStatus'?: AccountSupportingEntityCapability.VerificationStatusEnum;
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
export declare namespace AccountSupportingEntityCapability {
    enum AllowedLevelEnum {
        High = "high",
        Low = "low",
        Medium = "medium",
        NotApplicable = "notApplicable"
    }
    enum RequestedLevelEnum {
        High = "high",
        Low = "low",
        Medium = "medium",
        NotApplicable = "notApplicable"
    }
    enum VerificationStatusEnum {
        Invalid = "invalid",
        Pending = "pending",
        Rejected = "rejected",
        Valid = "valid"
    }
}
