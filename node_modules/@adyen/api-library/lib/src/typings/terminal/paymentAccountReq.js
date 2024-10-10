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
 * Adyen NodeJS API Library
 * Copyright (c) 2021 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentAccountReq = void 0;
class PaymentAccountReq {
    static getAttributeTypeMap() {
        return PaymentAccountReq.attributeTypeMap;
    }
}
exports.PaymentAccountReq = PaymentAccountReq;
PaymentAccountReq.discriminator = undefined;
PaymentAccountReq.attributeTypeMap = [
    {
        "name": "AccountType",
        "baseName": "AccountType",
        "type": "PaymentAccountReq.AccountTypeEnum"
    },
    {
        "name": "CardAcquisitionReference",
        "baseName": "CardAcquisitionReference",
        "type": "TransactionIdentification"
    },
    {
        "name": "PaymentInstrumentData",
        "baseName": "PaymentInstrumentData",
        "type": "PaymentInstrumentData"
    }
];
(function (PaymentAccountReq) {
    let AccountTypeEnum;
    (function (AccountTypeEnum) {
        AccountTypeEnum[AccountTypeEnum["CardTotals"] = 'CardTotals'] = "CardTotals";
        AccountTypeEnum[AccountTypeEnum["Checking"] = 'Checking'] = "Checking";
        AccountTypeEnum[AccountTypeEnum["CreditCard"] = 'CreditCard'] = "CreditCard";
        AccountTypeEnum[AccountTypeEnum["Default"] = 'Default'] = "Default";
        AccountTypeEnum[AccountTypeEnum["EpurseCard"] = 'EpurseCard'] = "EpurseCard";
        AccountTypeEnum[AccountTypeEnum["Investment"] = 'Investment'] = "Investment";
        AccountTypeEnum[AccountTypeEnum["Savings"] = 'Savings'] = "Savings";
        AccountTypeEnum[AccountTypeEnum["Universal"] = 'Universal'] = "Universal";
    })(AccountTypeEnum = PaymentAccountReq.AccountTypeEnum || (PaymentAccountReq.AccountTypeEnum = {}));
})(PaymentAccountReq = exports.PaymentAccountReq || (exports.PaymentAccountReq = {}));
//# sourceMappingURL=paymentAccountReq.js.map