import { TransferData } from './transferData';
export declare class TransferNotificationRequest {
    'data': TransferData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * The type of webhook.
    */
    'type'?: TransferNotificationRequest.TypeEnum;
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
export declare namespace TransferNotificationRequest {
    enum TypeEnum {
        Created = "balancePlatform.transfer.created",
        Updated = "balancePlatform.transfer.updated"
    }
}
