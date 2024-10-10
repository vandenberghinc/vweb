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
exports.SaleToPOIRequest = void 0;
class SaleToPOIRequest {
    static getAttributeTypeMap() {
        return SaleToPOIRequest.attributeTypeMap;
    }
}
exports.SaleToPOIRequest = SaleToPOIRequest;
SaleToPOIRequest.discriminator = undefined;
SaleToPOIRequest.attributeTypeMap = [
    {
        "name": "AbortRequest",
        "baseName": "AbortRequest",
        "type": "AbortRequest"
    },
    {
        "name": "AdminRequest",
        "baseName": "AdminRequest",
        "type": "AdminRequest"
    },
    {
        "name": "BalanceInquiryRequest",
        "baseName": "BalanceInquiryRequest",
        "type": "BalanceInquiryRequest"
    },
    {
        "name": "BatchRequest",
        "baseName": "BatchRequest",
        "type": "BatchRequest"
    },
    {
        "name": "CardAcquisitionRequest",
        "baseName": "CardAcquisitionRequest",
        "type": "CardAcquisitionRequest"
    },
    {
        "name": "CardReaderAPDURequest",
        "baseName": "CardReaderAPDURequest",
        "type": "CardReaderAPDURequest"
    },
    {
        "name": "CardReaderInitRequest",
        "baseName": "CardReaderInitRequest",
        "type": "CardReaderInitRequest"
    },
    {
        "name": "CardReaderPowerOffRequest",
        "baseName": "CardReaderPowerOffRequest",
        "type": "CardReaderPowerOffRequest"
    },
    {
        "name": "DiagnosisRequest",
        "baseName": "DiagnosisRequest",
        "type": "DiagnosisRequest"
    },
    {
        "name": "DisplayRequest",
        "baseName": "DisplayRequest",
        "type": "DisplayRequest"
    },
    {
        "name": "EnableServiceRequest",
        "baseName": "EnableServiceRequest",
        "type": "EnableServiceRequest"
    },
    {
        "name": "EventNotification",
        "baseName": "EventNotification",
        "type": "EventNotification"
    },
    {
        "name": "GetTotalsRequest",
        "baseName": "GetTotalsRequest",
        "type": "GetTotalsRequest"
    },
    {
        "name": "InputRequest",
        "baseName": "InputRequest",
        "type": "InputRequest"
    },
    {
        "name": "InputUpdate",
        "baseName": "InputUpdate",
        "type": "InputUpdate"
    },
    {
        "name": "LoginRequest",
        "baseName": "LoginRequest",
        "type": "LoginRequest"
    },
    {
        "name": "LogoutRequest",
        "baseName": "LogoutRequest",
        "type": "LogoutRequest"
    },
    {
        "name": "LoyaltyRequest",
        "baseName": "LoyaltyRequest",
        "type": "LoyaltyRequest"
    },
    {
        "name": "MessageHeader",
        "baseName": "MessageHeader",
        "type": "MessageHeader"
    },
    {
        "name": "PaymentRequest",
        "baseName": "PaymentRequest",
        "type": "PaymentRequest"
    },
    {
        "name": "PINRequest",
        "baseName": "PINRequest",
        "type": "PINRequest"
    },
    {
        "name": "PrintRequest",
        "baseName": "PrintRequest",
        "type": "PrintRequest"
    },
    {
        "name": "ReconciliationRequest",
        "baseName": "ReconciliationRequest",
        "type": "ReconciliationRequest"
    },
    {
        "name": "ReversalRequest",
        "baseName": "ReversalRequest",
        "type": "ReversalRequest"
    },
    {
        "name": "SecurityTrailer",
        "baseName": "SecurityTrailer",
        "type": "ContentInformation"
    },
    {
        "name": "SoundRequest",
        "baseName": "SoundRequest",
        "type": "SoundRequest"
    },
    {
        "name": "StoredValueRequest",
        "baseName": "StoredValueRequest",
        "type": "StoredValueRequest"
    },
    {
        "name": "TransactionStatusRequest",
        "baseName": "TransactionStatusRequest",
        "type": "TransactionStatusRequest"
    },
    {
        "name": "TransmitRequest",
        "baseName": "TransmitRequest",
        "type": "TransmitRequest"
    }
];
//# sourceMappingURL=saleToPOIRequest.js.map