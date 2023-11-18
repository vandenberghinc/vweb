import { ApiCredential } from './apiCredential';
import { PaginationLinks } from './paginationLinks';
export declare class ListMerchantApiCredentialsResponse {
    '_links'?: PaginationLinks;
    /**
    * The list of API credentials.
    */
    'data'?: Array<ApiCredential>;
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
