import { Amount } from './amount';
export declare class AmountAdjustment {
    'amount'?: Amount;
    /**
    * The type of markup that is applied to an authorised payment.  Possible values: **exchange**, **forexMarkup**, **authHoldReserve**, **atmMarkup**.
    */
    'amountAdjustmentType'?: AmountAdjustment.AmountAdjustmentTypeEnum;
    /**
    * The basepoints associated with the applied markup.
    */
    'basepoints'?: number;
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
export declare namespace AmountAdjustment {
    enum AmountAdjustmentTypeEnum {
        AtmMarkup = "atmMarkup",
        AuthHoldReserve = "authHoldReserve",
        Exchange = "exchange",
        ForexMarkup = "forexMarkup"
    }
}
