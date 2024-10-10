export declare class DeviceInfo {
    /**
    * The technology used to capture the card details.
    */
    'cardCaptureTechnology'?: string;
    /**
    * The name of the device.
    */
    'deviceName'?: string;
    /**
    * The form factor of the device to be provisioned.
    */
    'formFactor'?: string;
    /**
    * The IMEI number of the device being provisioned.
    */
    'imei'?: string;
    /**
    * The 2-digit device type provided on the ISO messages that the token is being provisioned to.
    */
    'isoDeviceType'?: string;
    /**
    * The MSISDN of the device being provisioned.
    */
    'msisdn'?: string;
    /**
    * The name of the device operating system.
    */
    'osName'?: string;
    /**
    * The version of the device operating system.
    */
    'osVersion'?: string;
    /**
    * Different types of payments supported for the network token.
    */
    'paymentTypes'?: Array<string>;
    /**
    * The serial number of the device.
    */
    'serialNumber'?: string;
    /**
    * The architecture or technology used for network token storage.
    */
    'storageTechnology'?: string;
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
