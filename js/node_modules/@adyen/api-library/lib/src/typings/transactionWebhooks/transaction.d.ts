import { Amount } from './amount';
import { ResourceReference } from './resourceReference';
import { TransferData } from './transferData';
export declare class Transaction {
    'accountHolder': ResourceReference;
    'amount': Amount;
    'balanceAccount': ResourceReference;
    /**
    * The unique identifier of the balance platform.
    */
    'balancePlatform': string;
    /**
    * The date the transaction was booked into the balance account.
    */
    'bookingDate': Date;
    /**
    * The date and time when the event was triggered, in ISO 8601 extended format. For example, **2020-12-18T10:15:30+01:00**.
    */
    'creationDate'?: Date;
    /**
    * The unique identifier of the transaction.
    */
    'id': string;
    /**
    * The status of the transaction.   Possible values:  * **pending**: The transaction is still pending.  * **booked**: The transaction has been booked to the balance account.
    */
    'status': Transaction.StatusEnum;
    'transfer'?: TransferData;
    /**
    * The date the transfer amount becomes available in the balance account.
    */
    'valueDate': Date;
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
export declare namespace Transaction {
    enum StatusEnum {
        Booked = "booked",
        Pending = "pending"
    }
}
