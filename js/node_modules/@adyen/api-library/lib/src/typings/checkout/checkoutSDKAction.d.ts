export declare class CheckoutSDKAction {
    /**
    * Encoded payment data.
    */
    'paymentData'?: string;
    /**
    * Specifies the payment method.
    */
    'paymentMethodType'?: string;
    /**
    * The data to pass to the SDK.
    */
    'sdkData'?: {
        [key: string]: string;
    };
    /**
    * The type of the action.
    */
    'type': CheckoutSDKAction.TypeEnum;
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
export declare namespace CheckoutSDKAction {
    enum TypeEnum {
        Sdk = "sdk",
        WechatpaySdk = "wechatpaySDK"
    }
}
