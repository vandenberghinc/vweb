import { SplitConfiguration } from './splitConfiguration';
export declare class SplitConfigurationList {
    /**
    * List of split configurations applied to the stores under the merchant account.
    */
    'data'?: Array<SplitConfiguration>;
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
