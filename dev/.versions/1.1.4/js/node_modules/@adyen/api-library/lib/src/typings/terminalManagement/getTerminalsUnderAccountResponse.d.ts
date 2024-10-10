import { MerchantAccount } from './merchantAccount';
export declare class GetTerminalsUnderAccountResponse {
    /**
    * Your company account.
    */
    'companyAccount': string;
    /**
    * Array that returns a list of all terminals that are in the inventory of the company account.
    */
    'inventoryTerminals'?: Array<string>;
    /**
    * Array that returns a list of all merchant accounts belonging to the company account.
    */
    'merchantAccounts'?: Array<MerchantAccount>;
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
