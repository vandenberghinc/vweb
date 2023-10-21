export declare class CheckoutNativeRedirectAction {
    /**
    * When the redirect URL must be accessed via POST, use this data to post to the redirect URL.
    */
    'data'?: {
        [key: string]: string;
    };
    /**
    * Specifies the HTTP method, for example GET or POST.
    */
    'method'?: string;
    /**
    * Native SDK\'s redirect data containing the direct issuer link and state data that must be submitted to the /v1/nativeRedirect/redirectResult.
    */
    'nativeRedirectData'?: string;
    /**
    * Specifies the payment method.
    */
    'paymentMethodType'?: string;
    /**
    * **nativeRedirect**
    */
    'type': CheckoutNativeRedirectAction.TypeEnum;
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
export declare namespace CheckoutNativeRedirectAction {
    enum TypeEnum {
        NativeRedirect = "nativeRedirect"
    }
}
