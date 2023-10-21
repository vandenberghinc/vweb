import { Amount } from './amount';
export declare class CheckoutOrderResponse {
    'amount'?: Amount;
    /**
    * The expiry date for the order.
    */
    'expiresAt'?: string;
    /**
    * The encrypted order data.
    */
    'orderData'?: string;
    /**
    * The `pspReference` that belongs to the order.
    */
    'pspReference': string;
    /**
    * The merchant reference for the order.
    */
    'reference'?: string;
    'remainingAmount'?: Amount;
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
