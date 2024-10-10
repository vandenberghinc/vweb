export declare class ThreeDSecureData {
    /**
    * In 3D Secure 1, the authentication response if the shopper was redirected.  In 3D Secure 2, this is the `transStatus` from the challenge result. If the transaction was frictionless, omit this parameter.
    */
    'authenticationResponse'?: ThreeDSecureData.AuthenticationResponseEnum;
    /**
    * The cardholder authentication value (base64 encoded, 20 bytes in a decoded form).
    */
    'cavv'?: string;
    /**
    * The CAVV algorithm used. Include this only for 3D Secure 1.
    */
    'cavvAlgorithm'?: string;
    /**
    * Indicator informing the Access Control Server (ACS) and the Directory Server (DS) that the authentication has been cancelled. For possible values, refer to [3D Secure API reference](https://docs.adyen.com/online-payments/3d-secure/api-reference#mpidata).
    */
    'challengeCancel'?: ThreeDSecureData.ChallengeCancelEnum;
    /**
    * In 3D Secure 1, this is the enrollment response from the 3D directory server.  In 3D Secure 2, this is the `transStatus` from the `ARes`.
    */
    'directoryResponse'?: ThreeDSecureData.DirectoryResponseEnum;
    /**
    * Supported for 3D Secure 2. The unique transaction identifier assigned by the Directory Server (DS) to identify a single transaction.
    */
    'dsTransID'?: string;
    /**
    * The electronic commerce indicator.
    */
    'eci'?: string;
    /**
    * Risk score calculated by Directory Server (DS). Required for Cartes Bancaires integrations.
    */
    'riskScore'?: string;
    /**
    * The version of the 3D Secure protocol.
    */
    'threeDSVersion'?: string;
    /**
    * Network token authentication verification value (TAVV). The network token cryptogram.
    */
    'tokenAuthenticationVerificationValue'?: string;
    /**
    * Provides information on why the `transStatus` field has the specified value. For possible values, refer to [our docs](https://docs.adyen.com/online-payments/3d-secure/api-reference#possible-transstatusreason-values).
    */
    'transStatusReason'?: string;
    /**
    * Supported for 3D Secure 1. The transaction identifier (Base64-encoded, 20 bytes in a decoded form).
    */
    'xid'?: string;
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
export declare namespace ThreeDSecureData {
    enum AuthenticationResponseEnum {
        Y = "Y",
        N = "N",
        U = "U",
        A = "A"
    }
    enum ChallengeCancelEnum {
        _01 = "01",
        _02 = "02",
        _03 = "03",
        _04 = "04",
        _05 = "05",
        _06 = "06",
        _07 = "07"
    }
    enum DirectoryResponseEnum {
        A = "A",
        C = "C",
        D = "D",
        I = "I",
        N = "N",
        R = "R",
        U = "U",
        Y = "Y"
    }
}
