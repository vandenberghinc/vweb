export declare class UninstallAndroidAppDetails {
    /**
    * The unique identifier of the app to be uninstalled.
    */
    'appId'?: string;
    /**
    * Type of terminal action: Uninstall an Android app.
    */
    'type'?: UninstallAndroidAppDetails.TypeEnum;
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
export declare namespace UninstallAndroidAppDetails {
    enum TypeEnum {
        UninstallAndroidApp = "UninstallAndroidApp"
    }
}
