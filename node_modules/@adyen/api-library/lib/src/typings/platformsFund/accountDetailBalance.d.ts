import { DetailBalance } from './detailBalance';
export declare class AccountDetailBalance {
    /**
    * The code of the account that holds the balance.
    */
    'accountCode'?: string;
    'detailBalance'?: DetailBalance;
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
