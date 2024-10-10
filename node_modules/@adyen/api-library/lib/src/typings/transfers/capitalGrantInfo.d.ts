import { Counterparty } from './counterparty';
export declare class CapitalGrantInfo {
    'counterparty'?: Counterparty;
    /**
    * The identifier of the grant account used for the grant.
    */
    'grantAccountId': string;
    /**
    * The identifier of the grant offer that has been selected and from which the grant details will be used.
    */
    'grantOfferId': string;
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
