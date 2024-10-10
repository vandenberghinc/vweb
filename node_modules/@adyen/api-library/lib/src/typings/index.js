"use strict";
/// <reference path="amount.ts" />
/// <reference path="apiError.ts" />
/// <reference path="applicationInfo.ts" />
/// <reference path="enums/environment.ts" />
/// <reference path="enums/vatCategory.ts" />
/// <reference path="nexo.ts" />
/// <reference path="notification/notification.ts" />
/// <reference path="requestOptions.ts" />
/// <reference path="platformsFund.ts" />
/// <reference path="platformsNotificationConfiguration.ts" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionWebhooks = exports.acsWebhooks = exports.managementWebhooks = exports.transferWebhooks = exports.reportWebhooks = exports.configurationWebhooks = exports.dataProtection = exports.transfers = exports.legalEntityManagement = exports.management = exports.terminalManagement = exports.terminal = exports.storedValue = exports.recurring = exports.platformsFund = exports.platformsHostedOnboardingPage = exports.platformsAccount = exports.platformsNotifications = exports.payout = exports.payment = exports.notification = exports.checkout = exports.binlookup = exports.balancePlatform = void 0;
exports.balancePlatform = __importStar(require("./balancePlatform/models"));
exports.binlookup = __importStar(require("./binLookup/models"));
exports.checkout = __importStar(require("./checkout/models"));
exports.notification = __importStar(require("./notification/models"));
exports.payment = __importStar(require("./payment/models"));
exports.payout = __importStar(require("./payout/models"));
exports.platformsNotifications = __importStar(require("./platformsNotifications/models"));
exports.platformsAccount = __importStar(require("./platformsAccount/models"));
exports.platformsHostedOnboardingPage = __importStar(require("./platformsHostedOnboardingPage/models"));
exports.platformsFund = __importStar(require("./platformsFund/models"));
exports.recurring = __importStar(require("./recurring/models"));
exports.storedValue = __importStar(require("./storedValue/models"));
exports.terminal = __importStar(require("./terminal/models"));
exports.terminalManagement = __importStar(require("./terminalManagement/models"));
exports.management = __importStar(require("./management/models"));
exports.legalEntityManagement = __importStar(require("./legalEntityManagement/models"));
exports.transfers = __importStar(require("./transfers/models"));
exports.dataProtection = __importStar(require("./dataProtection/models"));
exports.configurationWebhooks = __importStar(require("./configurationWebhooks/models"));
exports.reportWebhooks = __importStar(require("./reportWebhooks/models"));
exports.transferWebhooks = __importStar(require("./transferWebhooks/models"));
exports.managementWebhooks = __importStar(require("./managementWebhooks/models"));
exports.acsWebhooks = __importStar(require("./acsWebhooks/models"));
exports.transactionWebhooks = __importStar(require("./transactionWebhooks/models"));
//# sourceMappingURL=index.js.map