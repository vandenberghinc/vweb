export declare class ExternalTerminalAction {
    /**
    * The type of terminal action: **InstallAndroidApp**, **UninstallAndroidApp**, **InstallAndroidCertificate**, or **UninstallAndroidCertificate**.
    */
    'actionType'?: string;
    /**
    * Technical information about the terminal action.
    */
    'config'?: string;
    /**
    * The date and time when the action was carried out.
    */
    'confirmedAt'?: Date;
    /**
    * The unique ID of the terminal action.
    */
    'id'?: string;
    /**
    * The result message for the action.
    */
    'result'?: string;
    /**
    * The date and time when the action was scheduled to happen.
    */
    'scheduledAt'?: Date;
    /**
    * The status of the terminal action: **pending**, **successful**, **failed**, **cancelled**, or **tryLater**.
    */
    'status'?: string;
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
