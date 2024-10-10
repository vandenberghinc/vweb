export declare class TerminalConnectivityEthernet {
    /**
    * The terminal\'s ethernet IP address.
    */
    'ipAddress'?: string;
    /**
    * The ethernet link negotiation that the terminal uses.
    */
    'linkNegotiation'?: string;
    /**
    * The terminal\'s ethernet MAC address.
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
