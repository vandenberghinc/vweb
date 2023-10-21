import { Links } from './links';
import { Transaction } from './transaction';
export declare class TransactionSearchResponse {
    '_links'?: Links;
    /**
    * Contains the transactions that match the query parameters.
    */
    'data'?: Array<Transaction>;
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
