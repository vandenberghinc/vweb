import { SweepConfigurationNotificationData } from './sweepConfigurationNotificationData';
export declare class SweepConfigurationNotificationRequest {
    'data': SweepConfigurationNotificationData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of webhook.
    */
    'type': SweepConfigurationNotificationRequest.TypeEnum;
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
export declare namespace SweepConfigurationNotificationRequest {
    enum TypeEnum {
        Created = "balancePlatform.balanceAccountSweep.created",
        Updated = "balancePlatform.balanceAccountSweep.updated",
        Deleted = "balancePlatform.balanceAccountSweep.deleted"
    }
}
