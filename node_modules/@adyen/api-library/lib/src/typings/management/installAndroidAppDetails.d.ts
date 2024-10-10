export declare class InstallAndroidAppDetails {
    /**
    * The unique identifier of the app to be installed.
    */
    'appId'?: string;
    /**
    * Type of terminal action: Install an Android app.
    */
    'type'?: InstallAndroidAppDetails.TypeEnum;
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
export declare namespace InstallAndroidAppDetails {
    enum TypeEnum {
        InstallAndroidApp = "InstallAndroidApp"
    }
}
