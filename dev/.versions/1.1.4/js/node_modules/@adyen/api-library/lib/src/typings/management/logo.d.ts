export declare class Logo {
    /**
    * The image file, converted to a Base64-encoded string, of the logo to be shown on the terminal.
    */
    'data'?: string;
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
