import { Amount } from './amount';
export declare class TotalAmountRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    'value'?: Amount;
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
