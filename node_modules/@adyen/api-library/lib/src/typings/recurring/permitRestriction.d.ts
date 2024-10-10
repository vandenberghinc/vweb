import { Amount } from './amount';
export declare class PermitRestriction {
    'maxAmount'?: Amount;
    'singleTransactionLimit'?: Amount;
    /**
    * Only a single payment can be made using this permit if set to true, otherwise multiple payments are allowed.
    */
    'singleUse'?: boolean;
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
