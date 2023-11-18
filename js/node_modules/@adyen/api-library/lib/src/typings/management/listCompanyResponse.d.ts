import { Company } from './company';
import { PaginationLinks } from './paginationLinks';
export declare class ListCompanyResponse {
    '_links'?: PaginationLinks;
    /**
    * The list of companies.
    */
    'data'?: Array<Company>;
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
