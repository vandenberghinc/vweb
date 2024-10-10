import { Store } from './store';
export declare class MerchantAccount {
    /**
    * List of terminals assigned to this merchant account as in-store terminals. This means that the terminal is ready to be boarded, or is already boarded.
    */
    'inStoreTerminals'?: Array<string>;
    /**
    * List of terminals assigned to the inventory of this merchant account.
    */
    'inventoryTerminals'?: Array<string>;
    /**
    * The merchant account.
    */
    'merchantAccount': string;
    /**
    * Array of stores under this merchant account.
    */
    'stores'?: Array<Store>;
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
