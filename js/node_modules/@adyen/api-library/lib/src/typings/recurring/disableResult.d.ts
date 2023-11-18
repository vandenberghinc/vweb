export declare class DisableResult {
    /**
    * Depending on whether a specific recurring detail was in the request, result is either [detail-successfully-disabled] or [all-details-successfully-disabled].
    */
    'response'?: string;
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
