export declare class ThreeDS2CardRangeDetail {
    /**
    * Provides additional information to the 3DS Server. Possible values: - 01 (Authentication is available at ACS) - 02 (Attempts supported by ACS or DS) - 03 (Decoupled authentication supported) - 04 (Whitelisting supported)
    */
    'acsInfoInd'?: Array<string>;
    /**
    * Card brand.
    */
    'brandCode'?: string;
    /**
    * BIN end range.
    */
    'endRange'?: string;
    /**
    * BIN start range.
    */
    'startRange'?: string;
    /**
    * Supported 3D Secure protocol versions
    */
    'threeDS2Versions'?: Array<string>;
    /**
    * In a 3D Secure 2 browser-based flow, this is the URL where you should send the device fingerprint to.
    */
    'threeDSMethodURL'?: string;
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
