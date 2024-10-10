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
exports.SaleToPOIResponse = void 0;
class SaleToPOIResponse {
    static getAttributeTypeMap() {
        return SaleToPOIResponse.attributeTypeMap;
    }
}
exports.SaleToPOIResponse = SaleToPOIResponse;
SaleToPOIResponse.discriminator = undefined;
SaleToPOIResponse.attributeTypeMap = [
    {
        "name": "AdminResponse",
        "baseName": "AdminResponse",
        "type": "AdminResponse"
    },
    {
        "name": "BalanceInquiryResponse",
        "baseName": "BalanceInquiryResponse",
        "type": "BalanceInquiryResponse"
    },
    {
        "name": "BatchResponse",
        "baseName": "BatchResponse",
        "type": "BatchResponse"
    },
    {
        "name": "CardAcquisitionResponse",
        "baseName": "CardAcquisitionResponse",
        "type": "CardAcquisitionResponse"
    },
    {
        "name": "CardReaderAPDUResponse",
        "baseName": "CardReaderAPDUResponse",
        "type": "CardReaderAPDUResponse"
    },
    {
        "name": "CardReaderInitResponse",
        "baseName": "CardReaderInitResponse",
        "type": "CardReaderInitResponse"
    },
    {
        "name": "CardReaderPowerOffResponse",
        "baseName": "CardReaderPowerOffResponse",
        "type": "CardReaderPowerOffResponse"
    },
    {
        "name": "DiagnosisResponse",
        "baseName": "DiagnosisResponse",
        "type": "DiagnosisResponse"
    },
    {
        "name": "DisplayResponse",
        "baseName": "DisplayResponse",
        "type": "DisplayResponse"
    },
    {
        "name": "EnableServiceResponse",
        "baseName": "EnableServiceResponse",
        "type": "EnableServiceResponse"
    },
    {
        "name": "GetTotalsResponse",
        "baseName": "GetTotalsResponse",
        "type": "GetTotalsResponse"
    },
    {
        "name": "InputResponse",
        "baseName": "InputResponse",
        "type": "InputResponse"
    },
    {
        "name": "LoginResponse",
        "baseName": "LoginResponse",
        "type": "LoginResponse"
    },
    {
        "name": "LogoutResponse",
        "baseName": "LogoutResponse",
        "type": "LogoutResponse"
    },
    {
        "name": "LoyaltyResponse",
        "baseName": "LoyaltyResponse",
        "type": "LoyaltyResponse"
    },
    {
        "name": "MessageHeader",
        "baseName": "MessageHeader",
        "type": "MessageHeader"
    },
    {
        "name": "PaymentResponse",
        "baseName": "PaymentResponse",
        "type": "PaymentResponse"
    },
    {
        "name": "PINResponse",
        "baseName": "PINResponse",
        "type": "PINResponse"
    },
    {
        "name": "PrintResponse",
        "baseName": "PrintResponse",
        "type": "PrintResponse"
    },
    {
        "name": "ReconciliationResponse",
        "baseName": "ReconciliationResponse",
        "type": "ReconciliationResponse"
    },
    {
        "name": "ReversalResponse",
        "baseName": "ReversalResponse",
        "type": "ReversalResponse"
    },
    {
        "name": "SecurityTrailer",
        "baseName": "SecurityTrailer",
        "type": "ContentInformation"
    },
    {
        "name": "SoundResponse",
        "baseName": "SoundResponse",
        "type": "SoundResponse"
    },
    {
        "name": "StoredValueResponse",
        "baseName": "StoredValueResponse",
        "type": "StoredValueResponse"
    },
    {
        "name": "TransactionStatusResponse",
        "baseName": "TransactionStatusResponse",
        "type": "TransactionStatusResponse"
    },
    {
        "name": "TransmitResponse",
        "baseName": "TransmitResponse",
        "type": "TransmitResponse"
    }
];
//# sourceMappingURL=saleToPOIResponse.js.map