import { DefenseDocumentType } from './defenseDocumentType';
export declare class DefenseReason {
    /**
    * Array of defense document types for a specific defense reason. Indicates the document types that you can submit to the schemes to defend this dispute, and whether they are required.
    */
    'defenseDocumentTypes'?: Array<DefenseDocumentType>;
    /**
    * The defense reason code that was selected to defend this dispute.
    */
    'defenseReasonCode': string;
    /**
    * Indicates if sufficient defense material has been supplied.
    */
    'satisfied': boolean;
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
