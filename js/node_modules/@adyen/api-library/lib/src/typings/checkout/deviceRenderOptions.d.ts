export declare class DeviceRenderOptions {
    /**
    * Supported SDK interface types. Allowed values: * native * html * both
    */
    'sdkInterface'?: DeviceRenderOptions.SdkInterfaceEnum;
    /**
    * UI types supported for displaying specific challenges. Allowed values: * text * singleSelect * outOfBand * otherHtml * multiSelect
    */
    'sdkUiType'?: Array<DeviceRenderOptions.SdkUiTypeEnum>;
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
export declare namespace DeviceRenderOptions {
    enum SdkInterfaceEnum {
        Native = "native",
        Html = "html",
        Both = "both"
    }
    enum SdkUiTypeEnum {
        MultiSelect = "multiSelect",
        OtherHtml = "otherHtml",
        OutOfBand = "outOfBand",
        SingleSelect = "singleSelect",
        Text = "text"
    }
}
