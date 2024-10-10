import { ShippingLocation } from './shippingLocation';
export declare class ShippingLocationsResponse {
    /**
    * Physical locations where orders can be shipped to.
    */
    'data'?: Array<ShippingLocation>;
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
