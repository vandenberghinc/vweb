export declare class CheckoutQrCodeAction {
    /**
    * Expiry time of the QR code.
    */
    'expiresAt'?: string;
    /**
    * Encoded payment data.
    */
    'paymentData'?: string;
    /**
    * Specifies the payment method.
    */
    'paymentMethodType'?: string;
    /**
    * The contents of the QR code as a UTF8 string.
    */
    'qrCodeData'?: string;
    /**
    * **qrCode**
    */
    'type': CheckoutQrCodeAction.TypeEnum;
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
export declare namespace CheckoutQrCodeAction {
    enum TypeEnum {
        QrCode = "qrCode"
    }
}
