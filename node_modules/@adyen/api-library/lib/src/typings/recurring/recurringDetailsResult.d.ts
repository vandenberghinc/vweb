import { RecurringDetailWrapper } from './recurringDetailWrapper';
export declare class RecurringDetailsResult {
    /**
    * The date when the recurring details were created.
    */
    'creationDate'?: Date;
    /**
    * Payment details stored for recurring payments.
    */
    'details'?: Array<RecurringDetailWrapper>;
    /**
    * The most recent email for this shopper (if available).
    */
    'lastKnownShopperEmail'?: string;
    /**
    * The reference you use to uniquely identify the shopper (e.g. user ID or account ID).
    */
    'shopperReference'?: string;
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
