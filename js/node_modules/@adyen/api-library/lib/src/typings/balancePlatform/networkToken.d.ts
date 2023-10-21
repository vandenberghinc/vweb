import { DeviceInfo } from './deviceInfo';
export declare class NetworkToken {
    /**
    * The card brand variant of the payment instrument associated with the network token. For example, **mc_prepaid_mrw**.
    */
    'brandVariant'?: string;
    /**
    * Date and time when the network token was created, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) extended format. For example, **2020-12-18T10:15:30+01:00**..
    */
    'creationDate'?: Date;
    'device'?: DeviceInfo;
    /**
    * The unique identifier of the network token.
    */
    'id'?: string;
    /**
    * The unique identifier of the payment instrument to which this network token belongs to.
    */
    'paymentInstrumentId'?: string;
    /**
    * The status of the network token. Possible values: **active**, **inactive**, **suspended**, **closed**.
    */
    'status'?: NetworkToken.StatusEnum;
    /**
    * The last four digits of the network token `id`.
    */
    'tokenLastFour'?: string;
    /**
    * The type of wallet the network token is associated with. For example, **applePay**.
    */
    'type'?: string;
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
export declare namespace NetworkToken {
    enum StatusEnum {
        Active = "active",
        Inactive = "inactive",
        Suspended = "suspended",
        Closed = "closed"
    }
}
