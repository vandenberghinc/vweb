import { PermitResult } from './permitResult';
export declare class CreatePermitResult {
    /**
    * List of new permits.
    */
    'permitResultList'?: Array<PermitResult>;
    /**
    * A unique reference associated with the request. This value is globally unique; quote it when communicating with us about this request.
    */
    'pspReference'?: string;
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
