export declare class ThreeDS2ResponseData {
    'acsChallengeMandated'?: string;
    'acsOperatorID'?: string;
    'acsReferenceNumber'?: string;
    'acsSignedContent'?: string;
    'acsTransID'?: string;
    'acsURL'?: string;
    'authenticationType'?: string;
    'cardHolderInfo'?: string;
    'cavvAlgorithm'?: string;
    'challengeIndicator'?: string;
    'dsReferenceNumber'?: string;
    'dsTransID'?: string;
    'exemptionIndicator'?: string;
    'messageVersion'?: string;
    'riskScore'?: string;
    'sdkEphemPubKey'?: string;
    'threeDSServerTransID'?: string;
    'transStatus'?: string;
    'transStatusReason'?: string;
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
