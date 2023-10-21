import { MerchantAcquirerPair } from './merchantAcquirerPair';
export declare class MerchantsRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * List of merchant ID and acquirer ID pairs.
    */
    'value'?: Array<MerchantAcquirerPair>;
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
