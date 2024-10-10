import { Address } from './address';
export declare class BillingEntity {
    'address'?: Address;
    /**
    * The email address of the billing entity.
    */
    'email'?: string;
    /**
    * The unique identifier of the billing entity, for use as `billingEntityId` when creating an order.
    */
    'id'?: string;
    /**
    * The unique name of the billing entity.
    */
    'name'?: string;
    /**
    * The tax number of the billing entity.
    */
    'taxId'?: string;
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
