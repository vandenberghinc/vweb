import { PaginationLinks } from './paginationLinks';
import { Webhook } from './webhook';
export declare class ListWebhooksResponse {
    '_links'?: PaginationLinks;
    /**
    * Reference to the account.
    */
    'accountReference'?: string;
    /**
    * The list of webhooks configured for this account.
    */
    'data'?: Array<Webhook>;
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
