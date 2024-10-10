export declare class ThreeDSRequestData {
    /**
    * Dimensions of the 3DS2 challenge window to be displayed to the cardholder.  Possible values:  * **01** - size of 250x400  * **02** - size of 390x400 * **03** - size of 500x600 * **04** - size of 600x400 * **05** - Fullscreen
    */
    'challengeWindowSize'?: ThreeDSRequestData.ChallengeWindowSizeEnum;
    /**
    * Flag for data only flow.
    */
    'dataOnly'?: ThreeDSRequestData.DataOnlyEnum;
    /**
    * Indicates if [native 3D Secure authentication](https://docs.adyen.com/online-payments/3d-secure/native-3ds2) should be used when available.  Possible values: * **preferred**: Use native 3D Secure authentication when available.
    */
    'nativeThreeDS'?: ThreeDSRequestData.NativeThreeDSEnum;
    /**
    * The version of 3D Secure to use.  Possible values:  * **2.1.0** * **2.2.0**
    */
    'threeDSVersion'?: ThreeDSRequestData.ThreeDSVersionEnum;
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
export declare namespace ThreeDSRequestData {
    enum ChallengeWindowSizeEnum {
        _01 = "01",
        _02 = "02",
        _03 = "03",
        _04 = "04",
        _05 = "05"
    }
    enum DataOnlyEnum {
        False = "false",
        True = "true"
    }
    enum NativeThreeDSEnum {
        Preferred = "preferred"
    }
    enum ThreeDSVersionEnum {
        _10 = "2.1.0",
        _20 = "2.2.0"
    }
}
