import { Address } from './address';
export declare class Store {
    'address'?: Address;
    /**
    * The description of the store.
    */
    'description'?: string;
    /**
    * The list of terminals assigned to the store.
    */
    'inStoreTerminals'?: Array<string>;
    /**
    * The code of the merchant account.
    */
    'merchantAccountCode'?: string;
    /**
    * The status of the store:  - `PreActive`: the store has been created, but not yet activated.   - `Active`: the store has been activated. This means you can process payments for this store.   - `Inactive`: the store is currently not active.   - `InactiveWithModifications`: the store is currently not active, but payment modifications such as refunds are possible.   - `Closed`: the store has been closed.
    */
    'status'?: string;
    /**
    * The code of the store.
    */
    'store': string;
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
