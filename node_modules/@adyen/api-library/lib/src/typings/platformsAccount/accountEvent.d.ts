export declare class AccountEvent {
    /**
    * The event. >Permitted values: `InactivateAccount`, `RefundNotPaidOutTransfers`. For more information, refer to [Verification checks](https://docs.adyen.com/marketplaces-and-platforms/classic/verification-process).
    */
    'event'?: AccountEvent.EventEnum;
    /**
    * The date on which the event will take place.
    */
    'executionDate'?: Date;
    /**
    * The reason why this event has been created.
    */
    'reason'?: string;
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
export declare namespace AccountEvent {
    enum EventEnum {
        InactivateAccount = "InactivateAccount",
        RefundNotPaidOutTransfers = "RefundNotPaidOutTransfers"
    }
}
