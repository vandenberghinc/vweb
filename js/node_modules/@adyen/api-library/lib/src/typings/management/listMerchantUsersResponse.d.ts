import { PaginationLinks } from './paginationLinks';
import { User } from './user';
export declare class ListMerchantUsersResponse {
    '_links'?: PaginationLinks;
    /**
    * The list of users.
    */
    'data'?: Array<User>;
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
