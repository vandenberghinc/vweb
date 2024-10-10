export declare class DisputeServiceResult {
    /**
    * The general error message.
    */
    'errorMessage'?: string;
    /**
    * Indicates whether the request succeeded.
    */
    'success': boolean;
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
