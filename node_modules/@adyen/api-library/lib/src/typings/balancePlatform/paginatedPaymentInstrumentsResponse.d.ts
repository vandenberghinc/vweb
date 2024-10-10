import { PaymentInstrument } from './paymentInstrument';
export declare class PaginatedPaymentInstrumentsResponse {
    /**
    * Indicates whether there are more items on the next page.
    */
    'hasNext': boolean;
    /**
    * Indicates whether there are more items on the previous page.
    */
    'hasPrevious': boolean;
    /**
    * List of payment instruments associated with the balance account.
    */
    'paymentInstruments': Array<PaymentInstrument>;
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
