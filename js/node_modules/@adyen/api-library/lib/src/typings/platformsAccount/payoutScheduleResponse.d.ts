export declare class PayoutScheduleResponse {
    /**
    * The date of the next scheduled payout.
    */
    'nextScheduledPayout'?: Date;
    /**
    * The payout schedule of the account. Permitted values: `DEFAULT`, `DAILY`, `DAILY_US`, `DAILY_EU`, `DAILY_AU`, `DAILY_SG`, `WEEKLY`, `WEEKLY_ON_TUE_FRI_MIDNIGHT`, `BIWEEKLY_ON_1ST_AND_15TH_AT_MIDNIGHT`, `MONTHLY`, `HOLD`.
    */
    'schedule'?: PayoutScheduleResponse.ScheduleEnum;
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
export declare namespace PayoutScheduleResponse {
    enum ScheduleEnum {
        BiweeklyOn1StAnd15ThAtMidnight = "BIWEEKLY_ON_1ST_AND_15TH_AT_MIDNIGHT",
        Daily = "DAILY",
        DailyAu = "DAILY_AU",
        DailyEu = "DAILY_EU",
        DailySg = "DAILY_SG",
        DailyUs = "DAILY_US",
        Hold = "HOLD",
        Monthly = "MONTHLY",
        Weekly = "WEEKLY",
        WeeklyMonToFriAu = "WEEKLY_MON_TO_FRI_AU",
        WeeklyMonToFriEu = "WEEKLY_MON_TO_FRI_EU",
        WeeklyMonToFriUs = "WEEKLY_MON_TO_FRI_US",
        WeeklyOnTueFriMidnight = "WEEKLY_ON_TUE_FRI_MIDNIGHT",
        WeeklySunToThuAu = "WEEKLY_SUN_TO_THU_AU",
        WeeklySunToThuUs = "WEEKLY_SUN_TO_THU_US"
    }
}
