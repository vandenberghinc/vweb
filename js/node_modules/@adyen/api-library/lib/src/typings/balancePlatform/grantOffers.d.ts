import { GrantOffer } from './grantOffer';
export declare class GrantOffers {
    /**
    * A list of available grant offers.
    */
    'grantOffers': Array<GrantOffer>;
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
