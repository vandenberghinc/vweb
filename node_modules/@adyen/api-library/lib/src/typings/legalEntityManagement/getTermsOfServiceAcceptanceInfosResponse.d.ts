import { TermsOfServiceAcceptanceInfo } from './termsOfServiceAcceptanceInfo';
export declare class GetTermsOfServiceAcceptanceInfosResponse {
    /**
    * The Terms of Service acceptance information.
    */
    'data'?: Array<TermsOfServiceAcceptanceInfo>;
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
