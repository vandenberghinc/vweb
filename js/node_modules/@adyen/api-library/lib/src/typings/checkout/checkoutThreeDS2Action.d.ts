export declare class CheckoutThreeDS2Action {
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
    * A subtype of the token.
    */
    'subtype'?: string;
    /**
    * A token to pass to the 3DS2 Component to get the fingerprint.
    */
    'token'?: string;
    /**
    * **threeDS2**
    */
    'type': CheckoutThreeDS2Action.TypeEnum;
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
export declare namespace CheckoutThreeDS2Action {
    enum TypeEnum {
        ThreeDs2 = "threeDS2"
    }
}
