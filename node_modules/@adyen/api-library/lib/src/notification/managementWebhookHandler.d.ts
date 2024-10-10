import { managementWebhooks } from "../typings";
declare class ManagementWebhookHandler {
    private readonly payload;
    constructor(jsonPayload: string);
    getGenericWebhook(): managementWebhooks.MerchantUpdatedNotificationRequest | managementWebhooks.MerchantCreatedNotificationRequest | managementWebhooks.PaymentMethodCreatedNotificationRequest | managementWebhooks.PaymentMethodRequestRemovedNotificationRequest | managementWebhooks.PaymentMethodScheduledForRemovalNotificationRequest;
    getMerchantCreatedNotificationRequest(): managementWebhooks.MerchantCreatedNotificationRequest;
    getMerchantUpdatedNotificationRequest(): managementWebhooks.MerchantUpdatedNotificationRequest;
    getPaymentMethodCreatedNotificationRequest(): managementWebhooks.PaymentMethodCreatedNotificationRequest;
    getPaymentMethodRequestRemovedNotificationRequest(): managementWebhooks.PaymentMethodRequestRemovedNotificationRequest;
    getPaymentMethodScheduledForRemovalNotificationRequest(): managementWebhooks.PaymentMethodScheduledForRemovalNotificationRequest;
}
export default ManagementWebhookHandler;
