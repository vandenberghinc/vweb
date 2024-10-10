import { configurationWebhooks, acsWebhooks, reportWebhooks, transferWebhooks, transactionWebhooks } from "../typings";
declare class BankingWebhookHandler {
    private readonly payload;
    constructor(jsonPayload: string);
    getGenericWebhook(): acsWebhooks.AuthenticationNotificationRequest | configurationWebhooks.AccountHolderNotificationRequest | configurationWebhooks.BalanceAccountNotificationRequest | configurationWebhooks.PaymentNotificationRequest | configurationWebhooks.SweepConfigurationNotificationRequest | configurationWebhooks.CardOrderNotificationRequest | reportWebhooks.ReportNotificationRequest | transferWebhooks.TransferNotificationRequest | transactionWebhooks.TransactionNotificationRequestV4;
    getAuthenticationNotificationRequest(): acsWebhooks.AuthenticationNotificationRequest;
    getAccountHolderNotificationRequest(): configurationWebhooks.AccountHolderNotificationRequest;
    getBalanceAccountNotificationRequest(): configurationWebhooks.BalanceAccountNotificationRequest;
    getCardOrderNotificationRequest(): configurationWebhooks.CardOrderNotificationRequest;
    getPaymentNotificationRequest(): configurationWebhooks.PaymentNotificationRequest;
    getSweepConfigurationNotificationRequest(): configurationWebhooks.SweepConfigurationNotificationRequest;
    getReportNotificationRequest(): reportWebhooks.ReportNotificationRequest;
    getTransferNotificationRequest(): transferWebhooks.TransferNotificationRequest;
    getTransactionNotificationRequest(): transactionWebhooks.TransactionNotificationRequestV4;
}
export default BankingWebhookHandler;
