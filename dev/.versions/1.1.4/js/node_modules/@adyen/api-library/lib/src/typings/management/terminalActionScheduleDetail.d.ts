export declare class TerminalActionScheduleDetail {
    /**
    * The ID of the action on the specified terminal.
    */
    'id'?: string;
    /**
    * The unique ID of the terminal that the action applies to.
    */
    'terminalId'?: string;
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
