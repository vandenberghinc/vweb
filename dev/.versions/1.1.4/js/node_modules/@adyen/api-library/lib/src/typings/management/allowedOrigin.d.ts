import { Links } from './links';
export declare class AllowedOrigin {
    '_links'?: Links;
    /**
    * Domain of the allowed origin.
    */
    'domain': string;
    /**
    * Unique identifier of the allowed origin.
    */
    'id'?: string;
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
