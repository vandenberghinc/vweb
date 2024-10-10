import { StoredPaymentMethodResource } from './storedPaymentMethodResource';
export declare class ListStoredPaymentMethodsResponse {
    /**
    * Your merchant account.
    */
    'merchantAccount'?: string;
    /**
    * Your reference to uniquely identify this shopper, for example user ID or account ID. Minimum length: 3 characters. > Your reference must not include personally identifiable information (PII), for example name or email address.
    */
    'shopperReference'?: string;
    /**
    * List of all stored payment methods.
    */
    'storedPaymentMethods'?: Array<StoredPaymentMethodResource>;
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
