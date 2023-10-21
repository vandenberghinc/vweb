import { PermitRestriction } from './permitRestriction';
export declare class Permit {
    /**
    * Partner ID (when using the permit-per-partner token sharing model).
    */
    'partnerId'?: string;
    /**
    * The profile to apply to this permit (when using the shared permits model).
    */
    'profileReference'?: string;
    'restriction'?: PermitRestriction;
    /**
    * The key to link permit requests to permit results.
    */
    'resultKey'?: string;
    /**
    * The expiry date for this permit.
    */
    'validTillDate'?: Date;
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
