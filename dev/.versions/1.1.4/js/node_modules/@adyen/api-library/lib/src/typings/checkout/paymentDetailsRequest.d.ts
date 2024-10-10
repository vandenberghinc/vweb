import { DetailsRequestAuthenticationData } from './detailsRequestAuthenticationData';
import { PaymentCompletionDetails } from './paymentCompletionDetails';
export declare class PaymentDetailsRequest {
    'authenticationData'?: DetailsRequestAuthenticationData;
    'details': PaymentCompletionDetails;
    /**
    * Encoded payment data. For [authorizing a payment after using 3D Secure 2 Authentication-only](https://docs.adyen.com/online-payments/3d-secure/other-3ds-flows/authentication-only/#authorise-the-payment-with-adyen):  If you received `resultCode`: **AuthenticationNotRequired** in the `/payments` response, use the `threeDSPaymentData` from the same response.  If you received `resultCode`: **AuthenticationFinished** in the `/payments` response, use the `action.paymentData` from the same response.
    */
    'paymentData'?: string;
    /**
    * Change the `authenticationOnly` indicator originally set in the `/payments` request. Only needs to be set if you want to modify the value set previously.
    */
    'threeDSAuthenticationOnly'?: boolean;
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
