export declare class Opi {
    /**
    * Indicates if Pay at table is enabled.
    */
    'enablePayAtTable'?: boolean;
    /**
    * The store number to use for Pay at Table.
    */
    'payAtTableStoreNumber'?: string;
    /**
    * The URL and port number used for Pay at Table communication.
    */
    'payAtTableURL'?: string;
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
