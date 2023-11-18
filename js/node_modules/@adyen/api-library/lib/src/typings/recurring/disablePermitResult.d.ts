export declare class DisablePermitResult {
    /**
    * A unique reference associated with the request. This value is globally unique; quote it when communicating with us about this request.
    */
    'pspReference'?: string;
    /**
    * Status of the disable request.
    */
    'status'?: string;
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
