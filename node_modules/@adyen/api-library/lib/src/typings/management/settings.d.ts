export declare class Settings {
    /**
    * The preferred Wi-Fi band, for use if the terminals support multiple bands. Possible values: All, 2.4GHz, 5GHz.
    */
    'band'?: string;
    /**
    * Indicates whether roaming is enabled on the terminals.
    */
    'roaming'?: boolean;
    /**
    * The connection time-out in seconds. Minimum value: 0.
    */
    'timeout'?: number;
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
