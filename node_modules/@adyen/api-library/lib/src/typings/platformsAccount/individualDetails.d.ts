import { ViasName } from './viasName';
import { ViasPersonalData } from './viasPersonalData';
export declare class IndividualDetails {
    'name'?: ViasName;
    'personalData'?: ViasPersonalData;
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
