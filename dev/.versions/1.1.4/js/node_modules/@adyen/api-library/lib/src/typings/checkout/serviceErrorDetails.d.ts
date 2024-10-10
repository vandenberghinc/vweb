export declare class ServiceErrorDetails {
    'errorCode'?: string;
    'errorType'?: string;
    'message'?: string;
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
