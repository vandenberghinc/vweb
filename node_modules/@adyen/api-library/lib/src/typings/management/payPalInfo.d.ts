export declare class PayPalInfo {
    /**
    * Indicates if direct (immediate) capture for PayPal is enabled. If set to **true**, this setting overrides the [capture](https://docs.adyen.com/online-payments/capture) settings of your merchant account. Default value: **true**.
    */
    'directCapture'?: boolean;
    /**
    * PayPal Merchant ID. Character length and limitations: 13 single-byte alphanumeric characters.
    */
    'payerId': string;
    /**
    * Your business email address.
    */
    'subject': string;
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
