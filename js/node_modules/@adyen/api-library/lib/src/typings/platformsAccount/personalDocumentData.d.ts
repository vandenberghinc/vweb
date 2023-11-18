export declare class PersonalDocumentData {
    /**
    * The expiry date of the document,   in ISO-8601 YYYY-MM-DD format. For example, **2000-01-31**.
    */
    'expirationDate'?: string;
    /**
    * The country where the document was issued, in the two-character  [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. For example, **NL**.
    */
    'issuerCountry'?: string;
    /**
    * The state where the document was issued (if applicable).
    */
    'issuerState'?: string;
    /**
    * The number in the document.
    */
    'number'?: string;
    /**
    * The type of the document. Possible values: **ID**, **DRIVINGLICENSE**, **PASSPORT**, **SOCIALSECURITY**, **VISA**.  To delete an existing entry for a document `type`, send only the `type` field in your request.
    */
    'type': PersonalDocumentData.TypeEnum;
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
export declare namespace PersonalDocumentData {
    enum TypeEnum {
        Drivinglicense = "DRIVINGLICENSE",
        Id = "ID",
        Passport = "PASSPORT",
        Socialsecurity = "SOCIALSECURITY",
        Visa = "VISA"
    }
}
