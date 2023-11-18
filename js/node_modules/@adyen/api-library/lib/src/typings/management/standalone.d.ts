export declare class Standalone {
    /**
    * The default currency of the standalone payment terminal as an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code.
    */
    'currencyCode'?: string;
    /**
    * Enable standalone mode.
    */
    'enableStandalone'?: boolean;
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
