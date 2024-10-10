export declare class DayOfWeekRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * List of days of the week.  Possible values: **monday**, **tuesday**, **wednesday**, **thursday**, **friday**, **saturday**, **sunday**.
    */
    'value'?: Array<DayOfWeekRestriction.ValueEnum>;
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
export declare namespace DayOfWeekRestriction {
    enum ValueEnum {
        Friday = "friday",
        Monday = "monday",
        Saturday = "saturday",
        Sunday = "sunday",
        Thursday = "thursday",
        Tuesday = "tuesday",
        Wednesday = "wednesday"
    }
}
