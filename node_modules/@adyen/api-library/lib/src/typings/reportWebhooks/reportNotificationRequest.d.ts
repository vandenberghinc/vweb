import { ReportNotificationData } from './reportNotificationData';
export declare class ReportNotificationRequest {
    'data': ReportNotificationData;
    /**
    * The environment from which the webhook originated.  Possible values: **test**, **live**.
    */
    'environment': string;
    /**
    * Type of webhook.
    */
    'type': ReportNotificationRequest.TypeEnum;
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
export declare namespace ReportNotificationRequest {
    enum TypeEnum {
        BalancePlatformReportCreated = "balancePlatform.report.created"
    }
}
