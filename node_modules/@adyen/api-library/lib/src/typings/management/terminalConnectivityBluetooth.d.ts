export declare class TerminalConnectivityBluetooth {
    /**
    * The terminal\'s Bluetooth IP address.
    */
    'ipAddress'?: string;
    /**
    * The terminal\'s Bluetooth MAC address.
    */
    'macAddress'?: string;
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
