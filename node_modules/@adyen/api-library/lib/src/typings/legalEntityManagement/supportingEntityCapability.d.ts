export declare class SupportingEntityCapability {
    /**
    * Indicates whether the capability is allowed for the supporting entity.  If a capability is allowed for a supporting entity but not for the parent legal entity, this means the legal entity has other supporting entities that failed verification.  **You can use the allowed supporting entity** regardless of the verification status of other supporting entities.
    */
    'allowed'?: boolean;
    /**
    * Supporting entity reference
    */
    'id'?: string;
    /**
    * Indicates whether the supporting entity capability is requested.
    */
    'requested'?: boolean;
    /**
    * The status of the verification checks for the capability of the supporting entity.  Possible values:  * **pending**: Adyen is running the verification.  * **invalid**: The verification failed. Check if the `errors` array contains more information.  * **valid**: The verification has been successfully completed.  * **rejected**: Adyen has verified the information, but found reasons to not allow the capability.
    */
    'verificationStatus'?: string;
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
