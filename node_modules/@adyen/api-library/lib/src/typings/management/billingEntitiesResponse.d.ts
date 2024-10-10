import { BillingEntity } from './billingEntity';
export declare class BillingEntitiesResponse {
    /**
    * List of legal entities that can be used for the billing of orders.
    */
    'data'?: Array<BillingEntity>;
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
