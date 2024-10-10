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
exports.TransactionTotals = void 0;
class TransactionTotals {
    static getAttributeTypeMap() {
        return TransactionTotals.attributeTypeMap;
    }
}
exports.TransactionTotals = TransactionTotals;
TransactionTotals.discriminator = undefined;
TransactionTotals.attributeTypeMap = [
    {
        "name": "AcquirerID",
        "baseName": "AcquirerID",
        "type": "string"
    },
    {
        "name": "CardBrand",
        "baseName": "CardBrand",
        "type": "string"
    },
    {
        "name": "ErrorCondition",
        "baseName": "ErrorCondition",
        "type": "TransactionTotals.ErrorConditionEnum"
    },
    {
        "name": "HostReconciliationID",
        "baseName": "HostReconciliationID",
        "type": "string"
    },
    {
        "name": "LoyaltyCurrency",
        "baseName": "LoyaltyCurrency",
        "type": "string"
    },
    {
        "name": "LoyaltyTotals",
        "baseName": "LoyaltyTotals",
        "type": "Array<LoyaltyTotals>"
    },
    {
        "name": "LoyaltyUnit",
        "baseName": "LoyaltyUnit",
        "type": "TransactionTotals.LoyaltyUnitEnum"
    },
    {
        "name": "OperatorID",
        "baseName": "OperatorID",
        "type": "string"
    },
    {
        "name": "PaymentCurrency",
        "baseName": "PaymentCurrency",
        "type": "string"
    },
    {
        "name": "PaymentInstrumentType",
        "baseName": "PaymentInstrumentType",
        "type": "PaymentInstrumentType"
    },
    {
        "name": "PaymentTotals",
        "baseName": "PaymentTotals",
        "type": "Array<PaymentTotals>"
    },
    {
        "name": "POIID",
        "baseName": "POIID",
        "type": "string"
    },
    {
        "name": "SaleID",
        "baseName": "SaleID",
        "type": "string"
    },
    {
        "name": "ShiftNumber",
        "baseName": "ShiftNumber",
        "type": "string"
    },
    {
        "name": "TotalsGroupID",
        "baseName": "TotalsGroupID",
        "type": "string"
    }
];
(function (TransactionTotals) {
    let ErrorConditionEnum;
    (function (ErrorConditionEnum) {
        ErrorConditionEnum[ErrorConditionEnum["Aborted"] = 'Aborted'] = "Aborted";
        ErrorConditionEnum[ErrorConditionEnum["Busy"] = 'Busy'] = "Busy";
        ErrorConditionEnum[ErrorConditionEnum["Cancel"] = 'Cancel'] = "Cancel";
        ErrorConditionEnum[ErrorConditionEnum["DeviceOut"] = 'DeviceOut'] = "DeviceOut";
        ErrorConditionEnum[ErrorConditionEnum["InProgress"] = 'InProgress'] = "InProgress";
        ErrorConditionEnum[ErrorConditionEnum["InsertedCard"] = 'InsertedCard'] = "InsertedCard";
        ErrorConditionEnum[ErrorConditionEnum["InvalidCard"] = 'InvalidCard'] = "InvalidCard";
        ErrorConditionEnum[ErrorConditionEnum["LoggedOut"] = 'LoggedOut'] = "LoggedOut";
        ErrorConditionEnum[ErrorConditionEnum["MessageFormat"] = 'MessageFormat'] = "MessageFormat";
        ErrorConditionEnum[ErrorConditionEnum["NotAllowed"] = 'NotAllowed'] = "NotAllowed";
        ErrorConditionEnum[ErrorConditionEnum["NotFound"] = 'NotFound'] = "NotFound";
        ErrorConditionEnum[ErrorConditionEnum["PaymentRestriction"] = 'PaymentRestriction'] = "PaymentRestriction";
        ErrorConditionEnum[ErrorConditionEnum["Refusal"] = 'Refusal'] = "Refusal";
        ErrorConditionEnum[ErrorConditionEnum["UnavailableDevice"] = 'UnavailableDevice'] = "UnavailableDevice";
        ErrorConditionEnum[ErrorConditionEnum["UnavailableService"] = 'UnavailableService'] = "UnavailableService";
        ErrorConditionEnum[ErrorConditionEnum["UnreachableHost"] = 'UnreachableHost'] = "UnreachableHost";
        ErrorConditionEnum[ErrorConditionEnum["WrongPin"] = 'WrongPIN'] = "WrongPin";
    })(ErrorConditionEnum = TransactionTotals.ErrorConditionEnum || (TransactionTotals.ErrorConditionEnum = {}));
    let LoyaltyUnitEnum;
    (function (LoyaltyUnitEnum) {
        LoyaltyUnitEnum[LoyaltyUnitEnum["Monetary"] = 'Monetary'] = "Monetary";
        LoyaltyUnitEnum[LoyaltyUnitEnum["Point"] = 'Point'] = "Point";
    })(LoyaltyUnitEnum = TransactionTotals.LoyaltyUnitEnum || (TransactionTotals.LoyaltyUnitEnum = {}));
})(TransactionTotals = exports.TransactionTotals || (exports.TransactionTotals = {}));
//# sourceMappingURL=transactionTotals.js.map