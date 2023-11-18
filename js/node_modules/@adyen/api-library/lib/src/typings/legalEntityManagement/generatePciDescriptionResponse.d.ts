export declare class GeneratePciDescriptionResponse {
    /**
    * The generated questionnaires in a base64 encoded format.
    */
    'content'?: string;
    /**
    * The two-letter [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code for the questionnaire. For example, **en**.
    */
    'language'?: string;
    /**
    * The array of Adyen-generated unique identifiers for the questionnaires.
    */
    'pciTemplateReferences'?: Array<string>;
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
