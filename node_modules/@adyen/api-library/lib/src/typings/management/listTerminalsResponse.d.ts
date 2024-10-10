import { PaginationLinks } from './paginationLinks';
import { Terminal } from './terminal';
export declare class ListTerminalsResponse {
    '_links'?: PaginationLinks;
    /**
    * The list of terminals and their details.
    */
    'data'?: Array<Terminal>;
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
