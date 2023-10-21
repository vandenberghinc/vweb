export declare class Attachment {
    /**
    * The document in Base64-encoded string format.
    */
    'content': string;
    /**
    * The file format.   Possible values: **application/pdf**, **image/jpg**, **image/jpeg**, **image/png**.
    */
    'contentType'?: string;
    /**
    * The name of the file including the file extension.
    */
    'filename'?: string;
    /**
    * The name of the file including the file extension.
    */
    'pageName'?: string;
    /**
    * Specifies which side of the ID card is uploaded.  * When `type` is **driversLicense** or **identityCard**, set this to **front** or **back**.  * When omitted, we infer the page number based on the order of attachments.
    */
    'pageType'?: string;
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
