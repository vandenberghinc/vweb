export declare class Duration {
    /**
    * The unit of time. You can only use **minutes** and **hours** if the `interval.type` is **sliding**.  Possible values: **minutes**, **hours**, **days**, **weeks**, or **months**
    */
    'unit'?: Duration.UnitEnum;
    /**
    * The length of time by the unit. For example, 5 days.  The maximum duration is 90 days or an equivalent in other units. For example, 3 months.
    */
    'value'?: number;
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
export declare namespace Duration {
    enum UnitEnum {
        Days = "days",
        Hours = "hours",
        Minutes = "minutes",
        Months = "months",
        Weeks = "weeks"
    }
}
