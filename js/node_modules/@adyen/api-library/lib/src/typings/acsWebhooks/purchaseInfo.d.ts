import { Amount } from './amount';
export declare class PurchaseInfo {
    /**
    * Date of the purchase.
    */
    'date': string;
    /**
    * Name of the merchant.
    */
    'merchantName': string;
    'originalAmount': Amount;
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
