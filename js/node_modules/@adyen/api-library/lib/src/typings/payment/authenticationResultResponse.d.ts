import { ThreeDS1Result } from './threeDS1Result';
import { ThreeDS2Result } from './threeDS2Result';
export declare class AuthenticationResultResponse {
    'threeDS1Result'?: ThreeDS1Result;
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
