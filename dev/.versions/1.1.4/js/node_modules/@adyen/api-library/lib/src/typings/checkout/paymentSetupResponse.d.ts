import { RecurringDetail } from './recurringDetail';
export declare class PaymentSetupResponse {
    /**
    * The encoded payment session that you need to pass to the SDK.
    */
    'paymentSession'?: string;
    /**
    * The detailed list of stored payment details required to generate payment forms. Will be empty if oneClick is set to false in the request.
    */
    'recurringDetails'?: Array<RecurringDetail>;
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
