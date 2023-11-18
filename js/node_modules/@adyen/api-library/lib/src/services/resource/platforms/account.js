"use strict";
/*
 *                       ######
 *                       ######
 * ############    ####( ######  #####. ######  ############   ############
 * #############  #####( ######  #####. ######  #############  #############
 *        ######  #####( ######  #####. ######  #####  ######  #####  ######
 * ###### ######  #####( ######  #####. ######  #####  #####   #####  ######
 * ###### ######  #####( ######  #####. ######  #####          #####  ######
 * #############  #############  #############  #############  #####  ######
 *  ############   ############  #############   ############  #####  ######
 *                                      ######
 *                               #############
 *                               ############
 *
 * Adyen NodeJS API Library
 *
 * Copyright (c) 2019 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTypesEnum = void 0;
const client_1 = __importDefault(require("../../../client"));
const resource_1 = __importDefault(require("../../resource"));
var AccountTypesEnum;
(function (AccountTypesEnum) {
    AccountTypesEnum["AccountHolders"] = "AccountHolders";
    AccountTypesEnum["Accounts"] = "Accounts";
    AccountTypesEnum["Verification"] = "Verification";
})(AccountTypesEnum = exports.AccountTypesEnum || (exports.AccountTypesEnum = {}));
class PlatformsAccount extends resource_1.default {
    constructor(service, endpoint) {
        super(service, `${service.client.config.marketPayEndpoint}/Account/${client_1.default.MARKETPAY_ACCOUNT_API_VERSION}${endpoint}`);
    }
}
exports.default = PlatformsAccount;
//# sourceMappingURL=account.js.map