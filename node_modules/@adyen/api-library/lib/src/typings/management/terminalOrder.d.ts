import { BillingEntity } from './billingEntity';
import { OrderItem } from './orderItem';
import { ShippingLocation } from './shippingLocation';
export declare class TerminalOrder {
    'billingEntity'?: BillingEntity;
    /**
    * The merchant-defined purchase order number. This will be printed on the packing list.
    */
    'customerOrderReference'?: string;
    /**
    * The unique identifier of the order.
    */
    'id'?: string;
    /**
    * The products included in the order.
    */
    'items'?: Array<OrderItem>;
    /**
    * The date and time that the order was placed, in UTC ISO 8601 format. For example, \"2011-12-03T10:15:30Z\".
    */
    'orderDate'?: string;
    'shippingLocation'?: ShippingLocation;
    /**
    * The processing status of the order.
    */
    'status'?: string;
    /**
    * The URL, provided by the carrier company, where the shipment can be tracked.
    */
    'trackingUrl'?: string;
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
