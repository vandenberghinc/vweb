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
exports.PaymentData = void 0;
class PaymentData {
    static getAttributeTypeMap() {
        return PaymentData.attributeTypeMap;
    }
}
exports.PaymentData = PaymentData;
PaymentData.discriminator = undefined;
PaymentData.attributeTypeMap = [
    {
        "name": "CardAcquisitionReference",
        "baseName": "CardAcquisitionReference",
        "type": "TransactionIdentification"
    },
    {
        "name": "CustomerOrder",
        "baseName": "CustomerOrder",
        "type": "CustomerOrder"
    },
    {
        "name": "Instalment",
        "baseName": "Instalment",
        "type": "Instalment"
    },
    {
        "name": "PaymentInstrumentData",
        "baseName": "PaymentInstrumentData",
        "type": "PaymentInstrumentData"
    },
    {
        "name": "PaymentType",
        "baseName": "PaymentType",
        "type": "PaymentData.PaymentTypeEnum"
    },
    {
        "name": "RequestedValidityDate",
        "baseName": "RequestedValidityDate",
        "type": "string"
    },
    {
        "name": "SplitPaymentFlag",
        "baseName": "SplitPaymentFlag",
        "type": "boolean"
    }
];
(function (PaymentData) {
    let PaymentTypeEnum;
    (function (PaymentTypeEnum) {
        PaymentTypeEnum[PaymentTypeEnum["CashAdvance"] = 'CashAdvance'] = "CashAdvance";
        PaymentTypeEnum[PaymentTypeEnum["CashDeposit"] = 'CashDeposit'] = "CashDeposit";
        PaymentTypeEnum[PaymentTypeEnum["Completion"] = 'Completion'] = "Completion";
        PaymentTypeEnum[PaymentTypeEnum["FirstReservation"] = 'FirstReservation'] = "FirstReservation";
        PaymentTypeEnum[PaymentTypeEnum["Instalment"] = 'Instalment'] = "Instalment";
        PaymentTypeEnum[PaymentTypeEnum["IssuerInstalment"] = 'IssuerInstalment'] = "IssuerInstalment";
        PaymentTypeEnum[PaymentTypeEnum["Normal"] = 'Normal'] = "Normal";
        PaymentTypeEnum[PaymentTypeEnum["OneTimeReservation"] = 'OneTimeReservation'] = "OneTimeReservation";
        PaymentTypeEnum[PaymentTypeEnum["PaidOut"] = 'PaidOut'] = "PaidOut";
        PaymentTypeEnum[PaymentTypeEnum["Recurring"] = 'Recurring'] = "Recurring";
        PaymentTypeEnum[PaymentTypeEnum["Refund"] = 'Refund'] = "Refund";
        PaymentTypeEnum[PaymentTypeEnum["UpdateReservation"] = 'UpdateReservation'] = "UpdateReservation";
    })(PaymentTypeEnum = PaymentData.PaymentTypeEnum || (PaymentData.PaymentTypeEnum = {}));
})(PaymentData = exports.PaymentData || (exports.PaymentData = {}));
//# sourceMappingURL=paymentData.js.map