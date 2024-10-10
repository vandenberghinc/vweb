import { Card } from './card';
export declare class ScheduleAccountUpdaterRequest {
    /**
    * This field contains additional data, which may be required for a particular request.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    'card'?: Card;
    /**
    * Account of the merchant.
    */
    'merchantAccount': string;
    /**
    * A reference that merchants can apply for the call.
    */
    'reference': string;
    /**
    * The selected detail recurring reference.  Optional if `card` is provided.
    */
    'selectedRecurringDetailReference'?: string;
    /**
    * The reference of the shopper that owns the recurring contract.  Optional if `card` is provided.
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
