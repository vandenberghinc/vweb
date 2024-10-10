import { NameLocation } from './nameLocation';
export declare class MerchantData {
    /**
    * The unique identifier of the merchant\'s acquirer.
    */
    'acquirerId'?: string;
    /**
    * The merchant category code.
    */
    'mcc'?: string;
    /**
    * The merchant identifier.
    */
    'merchantId'?: string;
    'nameLocation'?: NameLocation;
    /**
    * The merchant postal code.
    */
    'postalCode'?: string;
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
