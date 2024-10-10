export declare class ScheduleAccountUpdaterResult {
    /**
    * Adyen\'s 16-character unique reference associated with the transaction. This value is globally unique; quote it when communicating with us about this request.
    */
    'pspReference': string;
    /**
    * The result of scheduling an Account Updater. If scheduling was successful, this field returns **Success**; otherwise it contains the error message.
    */
    'result': string;
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
