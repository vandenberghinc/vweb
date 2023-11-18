export declare class CardholderReceipt {
    /**
    * A custom header to show on the shopper receipt for an authorised transaction. Allows one or two comma-separated header lines, and blank lines. For example, `header,header,filler`
    */
    'headerForAuthorizedReceipt'?: string;
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
