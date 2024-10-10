export declare class UpdateAccountHolderStateRequest {
    /**
    * The code of the Account Holder on which to update the state.
    */
    'accountHolderCode': string;
    /**
    * If true, disable the requested state.  If false, enable the requested state.
    */
    'disable': boolean;
    /**
    * The reason that the state is being updated. >Required if the state is being disabled.
    */
    'reason'?: string;
    /**
    * The state to be updated. >Permitted values are: `Processing`, `Payout`
    */
    'stateType': UpdateAccountHolderStateRequest.StateTypeEnum;
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
export declare namespace UpdateAccountHolderStateRequest {
    enum StateTypeEnum {
        LimitedPayout = "LimitedPayout",
        LimitedProcessing = "LimitedProcessing",
        LimitlessPayout = "LimitlessPayout",
        LimitlessProcessing = "LimitlessProcessing",
        Payout = "Payout",
        Processing = "Processing"
    }
}
