export declare class WebDataExemption {
    /**
    * The reason why the web data was not provided. Possible value: **noOnlinePresence**.
    */
    'reason'?: WebDataExemption.ReasonEnum;
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
export declare namespace WebDataExemption {
    enum ReasonEnum {
        NoOnlinePresence = "noOnlinePresence",
        NotCollectedDuringOnboarding = "notCollectedDuringOnboarding"
    }
}
