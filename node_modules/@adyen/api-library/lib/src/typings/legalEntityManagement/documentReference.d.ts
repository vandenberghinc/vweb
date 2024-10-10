import { DocumentPage } from './documentPage';
export declare class DocumentReference {
    /**
    * Identifies whether the document is active and used for checks.
    */
    'active'?: boolean;
    /**
    * Your description for the document.
    */
    'description'?: string;
    /**
    * Document name.
    */
    'fileName'?: string;
    /**
    * The unique identifier of the resource.
    */
    'id'?: string;
    /**
    * The modification date of the document.
    */
    'modificationDate'?: Date;
    /**
    * List of document pages
    */
    'pages'?: Array<DocumentPage>;
    /**
    * Type of document, used when providing an ID number or uploading a document.
    */
    'type'?: string;
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
