import { Address } from './address';
import { Contact } from './contact';
export declare class ShippingLocation {
    'address'?: Address;
    'contact'?: Contact;
    /**
    * The unique identifier of the shipping location, for use as `shippingLocationId` when creating an order.
    */
    'id'?: string;
    /**
    * The unique name of the shipping location.
    */
    'name'?: string;
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
