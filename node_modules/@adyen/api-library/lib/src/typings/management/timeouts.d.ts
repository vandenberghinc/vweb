export declare class Timeouts {
    /**
    * Indicates the number of seconds of inactivity after which the terminal display goes into sleep mode.
    */
    'fromActiveToSleep'?: number;
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
