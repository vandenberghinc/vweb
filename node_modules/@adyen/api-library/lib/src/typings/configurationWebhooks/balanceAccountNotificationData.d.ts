import { BalanceAccount } from './balanceAccount';
export declare class BalanceAccountNotificationData {
    'balanceAccount'?: BalanceAccount;
    /**
    * The unique identifier of the balance platform.
    */
    'balancePlatform'?: string;
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
