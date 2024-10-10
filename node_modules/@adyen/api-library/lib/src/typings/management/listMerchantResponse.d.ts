import { Merchant } from './merchant';
import { PaginationLinks } from './paginationLinks';
export declare class ListMerchantResponse {
    '_links'?: PaginationLinks;
    /**
    * The list of merchant accounts.
    */
    'data'?: Array<Merchant>;
    /**
    * Total number of items.
    */
    'itemsTotal': number;
    /**
    * Total number of pages.
    */
    'pagesTotal': number;
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
