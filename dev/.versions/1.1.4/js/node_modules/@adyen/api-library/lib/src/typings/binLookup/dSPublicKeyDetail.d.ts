export declare class DSPublicKeyDetail {
    /**
    * Card brand.
    */
    'brand'?: string;
    /**
    * Directory Server (DS) identifier.
    */
    'directoryServerId'?: string;
    /**
    * The version of the mobile 3D Secure 2 SDK. For the possible values, refer to the versions in [Adyen 3DS2 Android](https://github.com/Adyen/adyen-3ds2-android/releases) and [Adyen 3DS2 iOS](https://github.com/Adyen/adyen-3ds2-ios/releases).
    */
    'fromSDKVersion'?: string;
    /**
    * Public key. The 3D Secure 2 SDK encrypts the device information by using the DS public key.
    */
    'publicKey'?: string;
    /**
    * Directory Server root certificates. The 3D Secure 2 SDK verifies the ACS signed content using the rootCertificates.
    */
    'rootCertificates'?: string;
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
