import { Amount } from './amount';
export declare class AccountProcessingState {
    /**
    * The reason why processing has been disabled.
    */
    'disableReason'?: string;
    /**
    * Indicates whether the processing of payments is allowed.
    */
    'disabled'?: boolean;
    'processedFrom'?: Amount;
    'processedTo'?: Amount;
    /**
    * The processing tier that the account holder occupies.
    */
    'tierNumber'?: number;
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
