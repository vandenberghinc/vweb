import { ApplicationInfo } from './applicationInfo';
export declare class PaymentCancelRequest {
    'applicationInfo'?: ApplicationInfo;
    /**
    * The merchant account that is used to process the payment.
    */
    'merchantAccount': string;
    /**
    * Your reference for the cancel request. Maximum length: 80 characters.
    */
    'reference'?: string;
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
