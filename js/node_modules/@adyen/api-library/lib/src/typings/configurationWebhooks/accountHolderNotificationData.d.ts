import { AccountHolder } from './accountHolder';
export declare class AccountHolderNotificationData {
    'accountHolder'?: AccountHolder;
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
