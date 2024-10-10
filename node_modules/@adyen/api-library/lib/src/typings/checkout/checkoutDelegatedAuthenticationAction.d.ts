export declare class CheckoutDelegatedAuthenticationAction {
    /**
    * A token needed to authorise a payment.
    */
    'authorisationToken'?: string;
    /**
    * Encoded payment data.
    */
    'paymentData'?: string;
    /**
    * Specifies the payment method.
    */
    'paymentMethodType'?: string;
    /**
    * A token to pass to the delegatedAuthentication component.
    */
    'token'?: string;
    /**
    * **delegatedAuthentication**
    */
    'type': CheckoutDelegatedAuthenticationAction.TypeEnum;
    /**
    * Specifies the URL to redirect to.
    */
    'url'?: string;
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
export declare namespace CheckoutDelegatedAuthenticationAction {
    enum TypeEnum {
        DelegatedAuthentication = "delegatedAuthentication"
    }
}
