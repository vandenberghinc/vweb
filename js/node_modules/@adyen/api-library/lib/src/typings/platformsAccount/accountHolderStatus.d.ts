import { AccountEvent } from './accountEvent';
import { AccountPayoutState } from './accountPayoutState';
import { AccountProcessingState } from './accountProcessingState';
export declare class AccountHolderStatus {
    /**
    * A list of events scheduled for the account holder.
    */
    'events'?: Array<AccountEvent>;
    'payoutState'?: AccountPayoutState;
    'processingState'?: AccountProcessingState;
    /**
    * The status of the account holder. >Permitted values: `Active`, `Inactive`, `Suspended`, `Closed`.
    */
    'status': AccountHolderStatus.StatusEnum;
    /**
    * The reason why the status was assigned to the account holder.
    */
    'statusReason'?: string;
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
export declare namespace AccountHolderStatus {
    enum StatusEnum {
        Active = "Active",
        Closed = "Closed",
        Inactive = "Inactive",
        Suspended = "Suspended"
    }
}
