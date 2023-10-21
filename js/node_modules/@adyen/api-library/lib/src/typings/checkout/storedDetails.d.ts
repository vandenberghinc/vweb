import { BankAccount } from './bankAccount';
import { Card } from './card';
export declare class StoredDetails {
    'bank'?: BankAccount;
    'card'?: Card;
    /**
    * The email associated with stored payment details.
    */
    'emailAddress'?: string;
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
