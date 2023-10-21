export declare class EntryModesRestriction {
    /**
    * Defines how the condition must be evaluated.
    */
    'operation': string;
    /**
    * List of point-of-sale entry modes.  Possible values: **barcode**, **chip**, **cof**, **contactless**, **magstripe**, **manual**, **ocr**, **server**.
    */
    'value'?: Array<EntryModesRestriction.ValueEnum>;
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
export declare namespace EntryModesRestriction {
    enum ValueEnum {
        Barcode = "barcode",
        Chip = "chip",
        Cof = "cof",
        Contactless = "contactless",
        Magstripe = "magstripe",
        Manual = "manual",
        Ocr = "ocr",
        Server = "server",
        Unknown = "unknown"
    }
}
