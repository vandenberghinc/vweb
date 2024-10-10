export declare class Phone {
    /**
    * Country code. Length: 1–3 characters.
    */
    'cc'?: string;
    /**
    * Subscriber number. Maximum length: 15 characters.
    */
    'subscriber'?: string;
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
