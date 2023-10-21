export declare class PlatformChargebackLogic {
    /**
    * The method of handling the chargeback.  Possible values: **deductFromLiableAccount**, **deductFromOneBalanceAccount**, **deductAccordingToSplitRatio**.
    */
    'behavior'?: PlatformChargebackLogic.BehaviorEnum;
    /**
    * The unique identifier of the balance account to which the chargeback fees are booked. By default, the chargeback fees are booked to your liable balance account.
    */
    'costAllocationAccount'?: string;
    /**
    * The unique identifier of the balance account against which the disputed amount is booked.  Required if `behavior` is **deductFromOneBalanceAccount**.
    */
    'targetAccount'?: string;
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
export declare namespace PlatformChargebackLogic {
    enum BehaviorEnum {
        DeductAccordingToSplitRatio = "deductAccordingToSplitRatio",
        DeductFromLiableAccount = "deductFromLiableAccount",
        DeductFromOneBalanceAccount = "deductFromOneBalanceAccount"
    }
}
