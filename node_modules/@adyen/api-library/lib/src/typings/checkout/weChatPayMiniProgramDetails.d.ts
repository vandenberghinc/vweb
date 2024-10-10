export declare class WeChatPayMiniProgramDetails {
    'appId'?: string;
    /**
    * The checkout attempt identifier.
    */
    'checkoutAttemptId'?: string;
    'openid'?: string;
    /**
    * **wechatpayMiniProgram**
    */
    'type'?: WeChatPayMiniProgramDetails.TypeEnum;
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
export declare namespace WeChatPayMiniProgramDetails {
    enum TypeEnum {
        WechatpayMiniProgram = "wechatpayMiniProgram"
    }
}
