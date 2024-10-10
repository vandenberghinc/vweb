export declare class KlarnaInfo {
    /**
    * Indicates the status of [Automatic capture](https://docs.adyen.com/online-payments/capture#automatic-capture). Default value: **false**.
    */
    'autoCapture'?: boolean;
    /**
    * The email address for disputes.
    */
    'disputeEmail': string;
    /**
    * The region of operation. For example, **NA**, **EU**, **CH**, **AU**.
    */
    'region': KlarnaInfo.RegionEnum;
    /**
    * The email address of merchant support.
    */
    'supportEmail': string;
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
export declare namespace KlarnaInfo {
    enum RegionEnum {
        Na = "NA",
        Eu = "EU",
        Ch = "CH",
        Au = "AU"
    }
}
