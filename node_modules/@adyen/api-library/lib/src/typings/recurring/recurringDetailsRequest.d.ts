import { Recurring } from './recurring';
export declare class RecurringDetailsRequest {
    /**
    * The merchant account identifier you want to process the (transaction) request with.
    */
    'merchantAccount': string;
    'recurring'?: Recurring;
    /**
    * The reference you use to uniquely identify the shopper (e.g. user ID or account ID).
    */
    'shopperReference': string;
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
