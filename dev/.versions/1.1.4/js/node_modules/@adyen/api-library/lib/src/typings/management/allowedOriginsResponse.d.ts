import { AllowedOrigin } from './allowedOrigin';
export declare class AllowedOriginsResponse {
    /**
    * List of allowed origins.
    */
    'data'?: Array<AllowedOrigin>;
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
