export declare class ResponseAdditionalData3DSecure {
    /**
    * Information provided by the issuer to the cardholder. If this field is present, you need to display this information to the cardholder.
    */
    'cardHolderInfo'?: string;
    /**
    * The Cardholder Authentication Verification Value (CAVV) for the 3D Secure authentication session, as a Base64-encoded 20-byte array.
    */
    'cavv'?: string;
    /**
    * The CAVV algorithm used.
    */
    'cavvAlgorithm'?: string;
    /**
    * Shows the [exemption type](https://docs.adyen.com/payments-fundamentals/psd2-sca-compliance-and-implementation-guide#specifypreferenceinyourapirequest) that Adyen requested for the payment.   Possible values: * **lowValue**  * **secureCorporate**  * **trustedBeneficiary**  * **transactionRiskAnalysis**
    */
    'scaExemptionRequested'?: string;
    /**
    * Indicates whether a card is enrolled for 3D Secure 2.
    */
    'threeds2_cardEnrolled'?: boolean;
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
