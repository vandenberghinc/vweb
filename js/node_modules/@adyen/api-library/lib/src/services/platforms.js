"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../service"));
const account_1 = __importDefault(require("./resource/platforms/account"));
const getJsonResponse_1 = __importDefault(require("./../helpers/getJsonResponse"));
const fund_1 = __importDefault(require("./resource/platforms/fund"));
const hop_1 = __importDefault(require("./resource/platforms/hop"));
const notificationConfiguration_1 = __importDefault(require("./resource/platforms/notificationConfiguration"));
class Platforms extends service_1.default {
    constructor(client) {
        super(client);
        this.createRequest = (service) => {
            return (request) => (0, getJsonResponse_1.default)(service, request);
        };
        // Account
        this._closeAccount = new account_1.default(this, "/closeAccount");
        this._updateAccount = new account_1.default(this, "/updateAccount");
        this._createAccount = new account_1.default(this, "/createAccount");
        this._uploadDocument = new account_1.default(this, "/uploadDocument");
        this._getUploadedDocuments = new account_1.default(this, "/getUploadedDocuments");
        this._deleteBankAccounts = new account_1.default(this, "/deleteBankAccounts");
        this._deletePayoutMethods = new account_1.default(this, "/deletePayoutMethods");
        this._deleteShareholders = new account_1.default(this, "/deleteShareholders");
        this._checkAccountHolder = new account_1.default(this, "/checkAccountHolder");
        this._createAccountHolder = new account_1.default(this, "/createAccountHolder");
        this._getAccountHolder = new account_1.default(this, "/getAccountHolder");
        this._updateAccountHolder = new account_1.default(this, "/updateAccountHolder");
        this._updateAccountHolderState = new account_1.default(this, "/updateAccountHolderState");
        this._suspendAccountHolder = new account_1.default(this, "/suspendAccountHolder");
        this._unSuspendAccountHolder = new account_1.default(this, "/unSuspendAccountHolder");
        this._closeAccountHolder = new account_1.default(this, "/closeAccountHolder");
        this._getTaxForm = new account_1.default(this, "/getTaxForm");
        // Fund
        this._accountHolderBalance = new fund_1.default(this, "/accountHolderBalance");
        this._accountHolderTransactionList = new fund_1.default(this, "/accountHolderTransactionList");
        this._payoutAccountHolder = new fund_1.default(this, "/payoutAccountHolder");
        this._transferFunds = new fund_1.default(this, "/transferFunds");
        this._refundFundsTransfer = new fund_1.default(this, "/refundFundsTransfer");
        this._setupBeneficiary = new fund_1.default(this, "/setupBeneficiary");
        this._refundNotPaidOutTransfers = new fund_1.default(this, "/refundNotPaidOutTransfers");
        this._debitAccountHolder = new fund_1.default(this, "/debitAccountHolder");
        // HOP
        this._getOnboardingUrl = new hop_1.default(this, "/getOnboardingUrl");
        this._getPciQuestionnaireUrl = new hop_1.default(this, "/getPciQuestionnaireUrl");
        // Notification Configuration
        this._createNotificationConfiguration = new notificationConfiguration_1.default(this, "/createNotificationConfiguration");
        this._getNotificationConfiguration = new notificationConfiguration_1.default(this, "/getNotificationConfiguration");
        this._getNotificationConfigurationList = new notificationConfiguration_1.default(this, "/getNotificationConfigurationList");
        this._testNotificationConfiguration = new notificationConfiguration_1.default(this, "/testNotificationConfiguration");
        this._updateNotificationConfiguration = new notificationConfiguration_1.default(this, "/updateNotificationConfiguration");
        this._deleteNotificationConfiguration = new notificationConfiguration_1.default(this, "/deleteNotificationConfigurations");
    }
    get Account() {
        const closeAccount = this.createRequest(this._closeAccount);
        const updateAccount = this.createRequest(this._updateAccount);
        const createAccount = this.createRequest(this._createAccount);
        const uploadDocument = this.createRequest(this._uploadDocument);
        const getUploadedDocuments = this.createRequest(this._getUploadedDocuments);
        const deleteBankAccounts = this.createRequest(this._deleteBankAccounts);
        const deletePayoutMethods = this.createRequest(this._deletePayoutMethods);
        const deleteShareholders = this.createRequest(this._deleteShareholders);
        const createAccountHolder = this.createRequest(this._createAccountHolder);
        const getAccountHolder = this.createRequest(this._getAccountHolder);
        const updateAccountHolder = this.createRequest(this._updateAccountHolder);
        const updateAccountHolderState = this.createRequest(this._updateAccountHolderState);
        const suspendAccountHolder = this.createRequest(this._suspendAccountHolder);
        const unSuspendAccountHolder = this.createRequest(this._unSuspendAccountHolder);
        const closeAccountHolder = this.createRequest(this._closeAccountHolder);
        const checkAccountHolder = this.createRequest(this._checkAccountHolder);
        const getTaxForm = this.createRequest(this._getTaxForm);
        const accounts = { closeAccount, updateAccount, createAccount };
        const verification = { uploadDocument, getUploadedDocuments, deleteBankAccounts, deletePayoutMethods, deleteShareholders, checkAccountHolder };
        const accountHolders = { createAccountHolder, getAccountHolder, updateAccountHolder, updateAccountHolderState, suspendAccountHolder, unSuspendAccountHolder, closeAccountHolder, getTaxForm };
        return { ...accounts, ...verification, ...accountHolders };
    }
    get Fund() {
        const accountHolderBalance = this.createRequest(this._accountHolderBalance);
        const accountHolderTransactionList = this.createRequest(this._accountHolderTransactionList);
        const payoutAccountHolder = this.createRequest(this._payoutAccountHolder);
        const transferFunds = this.createRequest(this._transferFunds);
        const refundFundsTransfer = this.createRequest(this._refundFundsTransfer);
        const setupBeneficiary = this.createRequest(this._setupBeneficiary);
        const refundNotPaidOutTransfers = this.createRequest(this._refundNotPaidOutTransfers);
        const debitAccountHolder = this.createRequest(this._debitAccountHolder);
        return { accountHolderBalance, accountHolderTransactionList, payoutAccountHolder, refundFundsTransfer, transferFunds, setupBeneficiary, refundNotPaidOutTransfers, debitAccountHolder };
    }
    get HostedOnboardingPage() {
        const getOnboardingUrl = this.createRequest(this._getOnboardingUrl);
        const getPciQuestionnaireUrl = this.createRequest(this._getPciQuestionnaireUrl);
        return { getOnboardingUrl, getPciQuestionnaireUrl };
    }
    get NotificationConfiguration() {
        const createNotificationConfiguration = this.createRequest(this._createNotificationConfiguration);
        const getNotificationConfiguration = this.createRequest(this._getNotificationConfiguration);
        const getNotificationConfigurationList = this.createRequest(this._getNotificationConfigurationList);
        const testNotificationConfiguration = this.createRequest(this._testNotificationConfiguration);
        const updateNotificationConfiguration = this.createRequest(this._updateNotificationConfiguration);
        const deleteNotificationConfigurations = this.createRequest(this._deleteNotificationConfiguration);
        return { createNotificationConfiguration, getNotificationConfiguration, getNotificationConfigurationList, testNotificationConfiguration, updateNotificationConfiguration, deleteNotificationConfigurations };
    }
}
exports.default = Platforms;
//# sourceMappingURL=platforms.js.map