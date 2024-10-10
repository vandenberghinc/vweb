import { Amount } from './amount';
import { PlatformChargebackLogic } from './platformChargebackLogic';
export declare class DonationRequest {
    /**
    * The Adyen account name of the charity.
    */
    'donationAccount': string;
    /**
    * The merchant account that is used to process the payment.
    */
    'merchantAccount': string;
    'modificationAmount': Amount;
    /**
    * The original pspReference of the payment to modify. This reference is returned in: * authorisation response * authorisation notification
    */
    'originalReference'?: string;
    'platformChargebackLogic'?: PlatformChargebackLogic;
    /**
    * Your reference for the payment modification. This reference is visible in Customer Area and in reports. Maximum length: 80 characters.
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
