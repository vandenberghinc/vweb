import { TimeOfDay } from './timeOfDay';
export declare class TimeOfDayRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    'value'?: TimeOfDay;
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
