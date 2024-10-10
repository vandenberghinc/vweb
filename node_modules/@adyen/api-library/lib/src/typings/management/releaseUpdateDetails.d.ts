export declare class ReleaseUpdateDetails {
    /**
    * Type of terminal action: Update Release.
    */
    'type'?: ReleaseUpdateDetails.TypeEnum;
    /**
    * Boolean flag that tells if the terminal should update at the first next maintenance call. If false, terminal will update on its configured reboot time.
    */
    'updateAtFirstMaintenanceCall'?: boolean;
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
export declare namespace ReleaseUpdateDetails {
    enum TypeEnum {
        ReleaseUpdate = "ReleaseUpdate"
    }
}
