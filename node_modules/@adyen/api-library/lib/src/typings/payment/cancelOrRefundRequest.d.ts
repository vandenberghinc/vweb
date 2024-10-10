import { PlatformChargebackLogic } from './platformChargebackLogic';
import { ThreeDSecureData } from './threeDSecureData';
export declare class CancelOrRefundRequest {
    /**
    * This field contains additional data, which may be required for a particular modification request.  The additionalData object consists of entries, each of which includes the key and value.
    */
    'additionalData'?: {
        [key: string]: string;
    };
    /**
    * The merchant account that is used to process the payment.
    */
    'merchantAccount': string;
    'mpiData'?: ThreeDSecureData;
    /**
    * The original merchant reference to cancel.
    */
    'originalMerchantReference'?: string;
    /**
    * The original pspReference of the payment to modify. This reference is returned in: * authorisation response * authorisation notification
    */
    'originalReference': string;
    'platformChargebackLogic'?: PlatformChargebackLogic;
    /**
    * Your reference for the payment modification. This reference is visible in Customer Area and in reports. Maximum length: 80 characters.
    */
    'reference'?: string;
    /**
    * The transaction reference provided by the PED. For point-of-sale integrations only.
    */
    'tenderReference'?: string;
    /**
    * Unique terminal ID for the PED that originally processed the request. For point-of-sale integrations only.
    */
    'uniqueTerminalId'?: string;
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
