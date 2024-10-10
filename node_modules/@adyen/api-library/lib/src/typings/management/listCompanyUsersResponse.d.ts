import { CompanyUser } from './companyUser';
import { PaginationLinks } from './paginationLinks';
export declare class ListCompanyUsersResponse {
    '_links'?: PaginationLinks;
    /**
    * The list of users.
    */
    'data'?: Array<CompanyUser>;
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
