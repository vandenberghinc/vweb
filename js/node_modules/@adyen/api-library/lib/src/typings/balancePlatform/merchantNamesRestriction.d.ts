import { StringMatch } from './stringMatch';
export declare class MerchantNamesRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    'value'?: Array<StringMatch>;
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
