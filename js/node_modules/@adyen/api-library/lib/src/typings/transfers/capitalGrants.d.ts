import { CapitalGrant } from './capitalGrant';
export declare class CapitalGrants {
    /**
    * The unique identifier of the grant.
    */
    'grants': Array<CapitalGrant>;
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
