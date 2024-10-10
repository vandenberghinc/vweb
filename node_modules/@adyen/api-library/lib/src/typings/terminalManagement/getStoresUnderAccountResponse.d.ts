import { Store } from './store';
export declare class GetStoresUnderAccountResponse {
    /**
    * Array that returns a list of all stores for the specified merchant account, or for all merchant accounts under the company account.
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
