import { PaginationLinks } from './paginationLinks';
import { Store } from './store';
export declare class ListStoresResponse {
    '_links'?: PaginationLinks;
    /**
    * List of stores
    */
    'data'?: Array<Store>;
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
