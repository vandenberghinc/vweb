import { SweepConfigurationV2 } from './sweepConfigurationV2';
export declare class SweepConfigurationNotificationData {
    /**
    * The unique identifier of the balance account for which the sweep was configured.
    */
    'accountId'?: string;
    /**
    * The unique identifier of the balance platform.
    */
    'balancePlatform'?: string;
    'sweep'?: SweepConfigurationV2;
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
