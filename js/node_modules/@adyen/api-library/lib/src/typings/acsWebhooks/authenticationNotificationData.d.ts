import { AuthenticationInfo } from './authenticationInfo';
import { PurchaseInfo } from './purchaseInfo';
export declare class AuthenticationNotificationData {
    'authentication': AuthenticationInfo;
    /**
    * The unique identifier of the balance platform.
    */
    'balancePlatform'?: string;
    /**
    * Unique identifier of the authentication.
    */
    'id': string;
    /**
    * Unique identifier of the payment instrument that was used for the authentication.
    */
    'paymentInstrumentId': string;
    'purchase': PurchaseInfo;
    /**
    * Outcome of the authentication. Allowed values: * authenticated * rejected * error
    */
    'status': AuthenticationNotificationData.StatusEnum;
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
export declare namespace AuthenticationNotificationData {
    enum StatusEnum {
        Authenticated = "authenticated",
        Rejected = "rejected",
        Error = "error"
    }
}
