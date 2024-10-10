import { BinDetail } from './binDetail';
import { DSPublicKeyDetail } from './dSPublicKeyDetail';
import { ThreeDS2CardRangeDetail } from './threeDS2CardRangeDetail';
export declare class ThreeDSAvailabilityResponse {
    'binDetails'?: BinDetail;
    /**
    * List of Directory Server (DS) public keys.
    */
    'dsPublicKeys'?: Array<DSPublicKeyDetail>;
    /**
    * Indicator if 3D Secure 1 is supported.
    */
    'threeDS1Supported'?: boolean;
    /**
    * List of brand and card range pairs.
    */
    'threeDS2CardRangeDetails'?: Array<ThreeDS2CardRangeDetail>;
    /**
    * Indicator if 3D Secure 2 is supported.
    */
    'threeDS2supported'?: boolean;
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
