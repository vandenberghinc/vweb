import { Amount } from './amount';
import { CardBin } from './cardBin';
export declare class CostEstimateResponse {
    'cardBin'?: CardBin;
    'costEstimateAmount'?: Amount;
    /**
    * Adyen\'s 16-character reference associated with the request.
    */
    'costEstimateReference'?: string;
    /**
    * The result of the cost estimation.
    */
    'resultCode'?: string;
    /**
    * Indicates the way the charges can be passed on to the cardholder. The following values are possible: * `ZERO` - the charges are not allowed to pass on * `PASSTHROUGH` - the charges can be passed on * `UNLIMITED` - there is no limit on how much surcharge is passed on
    */
    'surchargeType'?: string;
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
