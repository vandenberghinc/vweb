export declare class TerminalConnectivityWifi {
    /**
    * The terminal\'s IP address in the Wi-Fi network.
    */
    'ipAddress'?: string;
    /**
    * The terminal\'s MAC address in the Wi-Fi network.
    */
    'macAddress'?: string;
    /**
    * The SSID of the Wi-Fi network that the terminal is connected to.
    */
    'ssid'?: string;
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
