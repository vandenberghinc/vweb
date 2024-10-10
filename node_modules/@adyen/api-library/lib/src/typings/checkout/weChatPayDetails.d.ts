export declare class WeChatPayDetails {
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    /**
    * **wechatpay**
    */
    'type'?: WeChatPayDetails.TypeEnum;
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
export declare namespace WeChatPayDetails {
    enum TypeEnum {
        Wechatpay = "wechatpay",
        WechatpayPos = "wechatpay_pos"
    }
}
