export declare class Signature {
    /**
    * If `skipSignature` is false, indicates whether the shopper should provide a signature on the display (**true**) or on the merchant receipt (**false**).
    */
    'askSignatureOnScreen'?: boolean;
    /**
    * Name that identifies the terminal.
    */
    'deviceName'?: string;
    /**
    * Slogan shown on the start screen of the device.
    */
    'deviceSlogan'?: string;
    /**
    * Skip asking for a signature. This is possible because all global card schemes (American Express, Diners, Discover, JCB, MasterCard, VISA, and UnionPay) regard a signature as optional.
    */
    'skipSignature'?: boolean;
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
