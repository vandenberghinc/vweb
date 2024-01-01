import { Transaction } from './transaction';
export declare class TransactionNotificationRequestV4 {
    'data': Transaction;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of the webhook.
    */
    'type'?: TransactionNotificationRequestV4.TypeEnum;
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
export declare namespace TransactionNotificationRequestV4 {
    enum TypeEnum {
        BalancePlatformTransactionCreated = "balancePlatform.transaction.created"
    }
}
