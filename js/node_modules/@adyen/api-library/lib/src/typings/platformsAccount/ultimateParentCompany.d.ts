import { UltimateParentCompanyBusinessDetails } from './ultimateParentCompanyBusinessDetails';
import { ViasAddress } from './viasAddress';
export declare class UltimateParentCompany {
    'address'?: ViasAddress;
    'businessDetails'?: UltimateParentCompanyBusinessDetails;
    /**
    * Adyen-generated unique alphanumeric identifier (UUID) for the entry, returned in the response when you create an ultimate parent company. Required when updating an existing entry in an `/updateAccountHolder` request.
    */
    'ultimateParentCompanyCode'?: string;
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
