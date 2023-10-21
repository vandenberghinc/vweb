import { LegalArrangementRequest } from './legalArrangementRequest';
export declare class DeleteLegalArrangementRequest {
    /**
    * The code of the account holder.
    */
    'accountHolderCode': string;
    /**
    * List of legal arrangements.
    */
    'legalArrangements': Array<LegalArrangementRequest>;
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
