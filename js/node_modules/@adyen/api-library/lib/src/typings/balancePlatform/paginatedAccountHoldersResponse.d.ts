import { AccountHolder } from './accountHolder';
export declare class PaginatedAccountHoldersResponse {
    /**
    * List of account holders.
    */
    'accountHolders': Array<AccountHolder>;
    /**
    * Indicates whether there are more items on the next page.
    */
    'hasNext': boolean;
    /**
    * Indicates whether there are more items on the previous page.
    */
    'hasPrevious': boolean;
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
