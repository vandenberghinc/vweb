import { ThreeDS2Result } from './threeDS2Result';
export declare class ThreeDS2ResultResponse {
    'threeDS2Result'?: ThreeDS2Result;
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
