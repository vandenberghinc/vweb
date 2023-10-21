import { Permit } from './permit';
export declare class CreatePermitRequest {
    /**
    * The merchant account identifier, with which you want to process the transaction.
    */
    'merchantAccount': string;
    /**
    * The permits to create for this recurring contract.
    */
    'permits': Array<Permit>;
    /**
    * The recurring contract the new permits will use.
    */
    'recurringDetailReference': string;
    /**
    * The shopper\'s reference to uniquely identify this shopper (e.g. user ID or account ID).
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
