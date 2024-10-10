import { TransactionDescriptionInfo } from './transactionDescriptionInfo';
export declare class CartesBancairesInfo {
    /**
    * Cartes Bancaires SIRET. Format: 14 digits.
    */
    'siret': string;
    'transactionDescription'?: TransactionDescriptionInfo;
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
