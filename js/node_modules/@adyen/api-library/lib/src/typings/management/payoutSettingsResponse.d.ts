import { PayoutSettings } from './payoutSettings';
export declare class PayoutSettingsResponse {
    /**
    * The list of payout accounts.
    */
    'data'?: Array<PayoutSettings>;
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
