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
exports.PaymentResult = void 0;
class PaymentResult {
    static getAttributeTypeMap() {
        return PaymentResult.attributeTypeMap;
    }
}
exports.PaymentResult = PaymentResult;
PaymentResult.discriminator = undefined;
PaymentResult.attributeTypeMap = [
    {
        "name": "AmountsResp",
        "baseName": "AmountsResp",
        "type": "AmountsResp"
    },
    {
        "name": "AuthenticationMethod",
        "baseName": "AuthenticationMethod",
        "type": "Array<PaymentResult.AuthenticationMethodEnum>"
    },
    {
        "name": "CapturedSignature",
        "baseName": "CapturedSignature",
        "type": "CapturedSignature"
    },
    {
        "name": "CurrencyConversion",
        "baseName": "CurrencyConversion",
        "type": "Array<CurrencyConversion>"
    },
    {
        "name": "CustomerLanguage",
        "baseName": "CustomerLanguage",
        "type": "string"
    },
    {
        "name": "InstalmentType",
        "baseName": "InstalmentType",
        "type": "Instalment"
    },
    {
        "name": "MerchantOverrideFlag",
        "baseName": "MerchantOverrideFlag",
        "type": "boolean"
    },
    {
        "name": "OnlineFlag",
        "baseName": "OnlineFlag",
        "type": "boolean"
    },
    {
        "name": "PaymentAcquirerData",
        "baseName": "PaymentAcquirerData",
        "type": "PaymentAcquirerData"
    },
    {
        "name": "PaymentInstrumentData",
        "baseName": "PaymentInstrumentData",
        "type": "PaymentInstrumentData"
    },
    {
        "name": "PaymentType",
        "baseName": "PaymentType",
        "type": "PaymentResult.PaymentTypeEnum"
    },
    {
        "name": "ProtectedSignature",
        "baseName": "ProtectedSignature",
        "type": "ContentInformation"
    },
    {
        "name": "ValidityDate",
        "baseName": "ValidityDate",
        "type": "string"
    }
];
(function (PaymentResult) {
    let AuthenticationMethodEnum;
    (function (AuthenticationMethodEnum) {
        AuthenticationMethodEnum[AuthenticationMethodEnum["Bypass"] = 'Bypass'] = "Bypass";
        AuthenticationMethodEnum[AuthenticationMethodEnum["ManualVerification"] = 'ManualVerification'] = "ManualVerification";
        AuthenticationMethodEnum[AuthenticationMethodEnum["MerchantAuthentication"] = 'MerchantAuthentication'] = "MerchantAuthentication";
        AuthenticationMethodEnum[AuthenticationMethodEnum["OfflinePin"] = 'OfflinePIN'] = "OfflinePin";
        AuthenticationMethodEnum[AuthenticationMethodEnum["OnlinePin"] = 'OnlinePIN'] = "OnlinePin";
        AuthenticationMethodEnum[AuthenticationMethodEnum["PaperSignature"] = 'PaperSignature'] = "PaperSignature";
        AuthenticationMethodEnum[AuthenticationMethodEnum["SecureCertificate"] = 'SecureCertificate'] = "SecureCertificate";
        AuthenticationMethodEnum[AuthenticationMethodEnum["SecureNoCertificate"] = 'SecureNoCertificate'] = "SecureNoCertificate";
        AuthenticationMethodEnum[AuthenticationMethodEnum["SecuredChannel"] = 'SecuredChannel'] = "SecuredChannel";
        AuthenticationMethodEnum[AuthenticationMethodEnum["SignatureCapture"] = 'SignatureCapture'] = "SignatureCapture";
        AuthenticationMethodEnum[AuthenticationMethodEnum["UnknownMethod"] = 'UnknownMethod'] = "UnknownMethod";
    })(AuthenticationMethodEnum = PaymentResult.AuthenticationMethodEnum || (PaymentResult.AuthenticationMethodEnum = {}));
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
    })(PaymentTypeEnum = PaymentResult.PaymentTypeEnum || (PaymentResult.PaymentTypeEnum = {}));
})(PaymentResult = exports.PaymentResult || (exports.PaymentResult = {}));
//# sourceMappingURL=paymentResult.js.map