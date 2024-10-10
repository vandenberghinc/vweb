import { MinorUnitsMonetaryValue } from './minorUnitsMonetaryValue';
export declare class OfflineProcessing {
    /**
    * The maximum offline transaction amount for chip cards, in the processing currency and specified in [minor units](https://docs.adyen.com/development-resources/currency-codes).
    */
    'chipFloorLimit'?: number;
    /**
    * The maximum offline transaction amount for swiped cards, in the specified currency.
    */
    'offlineSwipeLimits'?: Array<MinorUnitsMonetaryValue>;
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
