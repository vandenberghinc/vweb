import { Amount } from './amount';
export declare class DetailBalance {
    /**
    * The list of balances held by the account.
    */
    'balance'?: Array<Amount>;
    /**
    * The list of on hold balances held by the account.
    */
    'onHoldBalance'?: Array<Amount>;
    /**
    * The list of pending balances held by the account.
    */
    'pendingBalance'?: Array<Amount>;
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
