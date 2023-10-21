import { CapitalBalance } from './capitalBalance';
import { GrantLimit } from './grantLimit';
export declare class CapitalGrantAccount {
    /**
    * The balances of the grant account.
    */
    'balances'?: Array<CapitalBalance>;
    /**
    * The unique identifier of the balance account used to fund the grant.
    */
    'fundingBalanceAccountId'?: string;
    /**
    * The identifier of the grant account.
    */
    'id'?: string;
    /**
    * The limits of the grant account.
    */
    'limits'?: Array<GrantLimit>;
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
