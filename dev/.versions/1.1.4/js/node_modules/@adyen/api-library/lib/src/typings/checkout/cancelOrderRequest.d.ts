import { EncryptedOrderData } from './encryptedOrderData';
export declare class CancelOrderRequest {
    /**
    * The merchant account identifier that orderData belongs to.
    */
    'merchantAccount': string;
    'order': EncryptedOrderData;
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
