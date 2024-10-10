export declare class FindTerminalRequest {
    /**
    * The unique terminal ID in the format `[Device model]-[Serial number]`.   For example, **V400m-324689776**.
    */
    'terminal': string;
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
