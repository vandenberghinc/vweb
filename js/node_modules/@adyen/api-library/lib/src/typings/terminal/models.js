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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
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
 * Copyright (c) 2020 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
__exportStar(require("./abortRequest"), exports);
__exportStar(require("./accountType"), exports);
__exportStar(require("./adminRequest"), exports);
__exportStar(require("./adminResponse"), exports);
__exportStar(require("./algorithmIdentifier"), exports);
__exportStar(require("./algorithmType"), exports);
__exportStar(require("./alignmentType"), exports);
__exportStar(require("./allowedProduct"), exports);
__exportStar(require("./amount"), exports);
__exportStar(require("./amountsReq"), exports);
__exportStar(require("./amountsResp"), exports);
__exportStar(require("./applicationInfo"), exports);
__exportStar(require("./areaSize"), exports);
__exportStar(require("./authenticatedData"), exports);
__exportStar(require("./authenticationMethodType"), exports);
__exportStar(require("./balanceInquiryRequest"), exports);
__exportStar(require("./balanceInquiryResponse"), exports);
__exportStar(require("./barcodeType"), exports);
__exportStar(require("./batchRequest"), exports);
__exportStar(require("./batchResponse"), exports);
__exportStar(require("./capturedSignature"), exports);
__exportStar(require("./cardAcquisitionRequest"), exports);
__exportStar(require("./cardAcquisitionResponse"), exports);
__exportStar(require("./cardAcquisitionTransaction"), exports);
__exportStar(require("./cardData"), exports);
__exportStar(require("./cardReaderAPDURequest"), exports);
__exportStar(require("./cardReaderAPDUResponse"), exports);
__exportStar(require("./cardReaderInitRequest"), exports);
__exportStar(require("./cardReaderInitResponse"), exports);
__exportStar(require("./cardReaderPowerOffRequest"), exports);
__exportStar(require("./cardReaderPowerOffResponse"), exports);
__exportStar(require("./cardholderPIN"), exports);
__exportStar(require("./cashHandlingDevice"), exports);
__exportStar(require("./characterHeightType"), exports);
__exportStar(require("./characterStyleType"), exports);
__exportStar(require("./characterWidthType"), exports);
__exportStar(require("./checkData"), exports);
__exportStar(require("./checkTypeCodeType"), exports);
__exportStar(require("./coinsOrBills"), exports);
__exportStar(require("./colorType"), exports);
__exportStar(require("./commonField"), exports);
__exportStar(require("./contentInformation"), exports);
__exportStar(require("./contentType"), exports);
__exportStar(require("./currencyConversion"), exports);
__exportStar(require("./customerOrder"), exports);
__exportStar(require("./customerOrderReqType"), exports);
__exportStar(require("./deviceType"), exports);
__exportStar(require("./diagnosisRequest"), exports);
__exportStar(require("./diagnosisResponse"), exports);
__exportStar(require("./digestedData"), exports);
__exportStar(require("./displayOutput"), exports);
__exportStar(require("./displayRequest"), exports);
__exportStar(require("./displayResponse"), exports);
__exportStar(require("./documentQualifierType"), exports);
__exportStar(require("./enableServiceRequest"), exports);
__exportStar(require("./enableServiceResponse"), exports);
__exportStar(require("./encapsulatedContent"), exports);
__exportStar(require("./encryptedContent"), exports);
__exportStar(require("./entryModeType"), exports);
__exportStar(require("./envelopedData"), exports);
__exportStar(require("./errorConditionType"), exports);
__exportStar(require("./eventNotification"), exports);
__exportStar(require("./eventToNotifyType"), exports);
__exportStar(require("./externalPlatform"), exports);
__exportStar(require("./forceEntryModeType"), exports);
__exportStar(require("./genericProfileType"), exports);
__exportStar(require("./geographicCoordinates"), exports);
__exportStar(require("./geolocation"), exports);
__exportStar(require("./getTotalsRequest"), exports);
__exportStar(require("./getTotalsResponse"), exports);
__exportStar(require("./globalStatusType"), exports);
__exportStar(require("./hostStatus"), exports);
__exportStar(require("./iCCResetData"), exports);
__exportStar(require("./identificationSupportType"), exports);
__exportStar(require("./identificationType"), exports);
__exportStar(require("./infoQualifyType"), exports);
__exportStar(require("./input"), exports);
__exportStar(require("./inputCommandType"), exports);
__exportStar(require("./inputData"), exports);
__exportStar(require("./inputRequest"), exports);
__exportStar(require("./inputResponse"), exports);
__exportStar(require("./inputResult"), exports);
__exportStar(require("./inputUpdate"), exports);
__exportStar(require("./instalment"), exports);
__exportStar(require("./instalmentType"), exports);
__exportStar(require("./issuer"), exports);
__exportStar(require("./issuerAndSerialNumber"), exports);
__exportStar(require("./loginRequest"), exports);
__exportStar(require("./loginResponse"), exports);
__exportStar(require("./logoutRequest"), exports);
__exportStar(require("./logoutResponse"), exports);
__exportStar(require("./loyaltyAccount"), exports);
__exportStar(require("./loyaltyAccountId"), exports);
__exportStar(require("./loyaltyAccountReq"), exports);
__exportStar(require("./loyaltyAccountStatus"), exports);
__exportStar(require("./loyaltyAcquirerData"), exports);
__exportStar(require("./loyaltyAmount"), exports);
__exportStar(require("./loyaltyData"), exports);
__exportStar(require("./loyaltyHandlingType"), exports);
__exportStar(require("./loyaltyRequest"), exports);
__exportStar(require("./loyaltyResponse"), exports);
__exportStar(require("./loyaltyResult"), exports);
__exportStar(require("./loyaltyTotals"), exports);
__exportStar(require("./loyaltyTransaction"), exports);
__exportStar(require("./loyaltyTransactionType"), exports);
__exportStar(require("./loyaltyUnitType"), exports);
__exportStar(require("./menuEntry"), exports);
__exportStar(require("./menuEntryTagType"), exports);
__exportStar(require("./merchantDevice"), exports);
__exportStar(require("./messageCategoryType"), exports);
__exportStar(require("./messageClassType"), exports);
__exportStar(require("./messageHeader"), exports);
__exportStar(require("./messageReference"), exports);
__exportStar(require("./messageType"), exports);
__exportStar(require("./mobileData"), exports);
__exportStar(require("./namedKeyEncryptedData"), exports);
__exportStar(require("./nexoDerivedKey"), exports);
__exportStar(require("./originalPOITransaction"), exports);
__exportStar(require("./outputBarcode"), exports);
__exportStar(require("./outputContent"), exports);
__exportStar(require("./outputFormatType"), exports);
__exportStar(require("./outputResult"), exports);
__exportStar(require("./outputText"), exports);
__exportStar(require("./pINFormatType"), exports);
__exportStar(require("./pINRequest"), exports);
__exportStar(require("./pINRequestType"), exports);
__exportStar(require("./pINResponse"), exports);
__exportStar(require("./pOICapabilitiesType"), exports);
__exportStar(require("./pOIData"), exports);
__exportStar(require("./pOIProfile"), exports);
__exportStar(require("./pOISoftware"), exports);
__exportStar(require("./pOIStatus"), exports);
__exportStar(require("./pOISystemData"), exports);
__exportStar(require("./pOITerminalData"), exports);
__exportStar(require("./parameter"), exports);
__exportStar(require("./paymentAccountReq"), exports);
__exportStar(require("./paymentAccountStatus"), exports);
__exportStar(require("./paymentAcquirerData"), exports);
__exportStar(require("./paymentData"), exports);
__exportStar(require("./paymentInstrumentData"), exports);
__exportStar(require("./paymentInstrumentType"), exports);
__exportStar(require("./paymentReceipt"), exports);
__exportStar(require("./paymentRequest"), exports);
__exportStar(require("./paymentResponse"), exports);
__exportStar(require("./paymentResult"), exports);
__exportStar(require("./paymentToken"), exports);
__exportStar(require("./paymentTotals"), exports);
__exportStar(require("./paymentTransaction"), exports);
__exportStar(require("./paymentType"), exports);
__exportStar(require("./performedTransaction"), exports);
__exportStar(require("./periodUnitType"), exports);
__exportStar(require("./predefinedContent"), exports);
__exportStar(require("./printOutput"), exports);
__exportStar(require("./printRequest"), exports);
__exportStar(require("./printResponse"), exports);
__exportStar(require("./printerStatusType"), exports);
__exportStar(require("./rebates"), exports);
__exportStar(require("./reconciliationRequest"), exports);
__exportStar(require("./reconciliationResponse"), exports);
__exportStar(require("./reconciliationType"), exports);
__exportStar(require("./relativeDistinguishedName"), exports);
__exportStar(require("./repeatedMessageResponse"), exports);
__exportStar(require("./repeatedResponseMessageBody"), exports);
__exportStar(require("./response"), exports);
__exportStar(require("./responseModeType"), exports);
__exportStar(require("./resultType"), exports);
__exportStar(require("./reversalReasonType"), exports);
__exportStar(require("./reversalRequest"), exports);
__exportStar(require("./reversalResponse"), exports);
__exportStar(require("./saleCapabilitiesType"), exports);
__exportStar(require("./saleData"), exports);
__exportStar(require("./saleItem"), exports);
__exportStar(require("./saleItemRebate"), exports);
__exportStar(require("./saleProfile"), exports);
__exportStar(require("./saleSoftware"), exports);
__exportStar(require("./saleTerminalData"), exports);
__exportStar(require("./saleToAcquirerData"), exports);
__exportStar(require("./saleToIssuerData"), exports);
__exportStar(require("./saleToPOIRequest"), exports);
__exportStar(require("./saleToPOIResponse"), exports);
__exportStar(require("./saleToPOISecuredMessage"), exports);
__exportStar(require("./securityKey"), exports);
__exportStar(require("./securityTrailer"), exports);
__exportStar(require("./sensitiveCardData"), exports);
__exportStar(require("./sensitiveMobileData"), exports);
__exportStar(require("./serviceProfilesType"), exports);
__exportStar(require("./servicesEnabledType"), exports);
__exportStar(require("./shopperInteractionDevice"), exports);
__exportStar(require("./signaturePoint"), exports);
__exportStar(require("./signedData"), exports);
__exportStar(require("./signer"), exports);
__exportStar(require("./signerIdentifier"), exports);
__exportStar(require("./soundActionType"), exports);
__exportStar(require("./soundContent"), exports);
__exportStar(require("./soundFormatType"), exports);
__exportStar(require("./soundRequest"), exports);
__exportStar(require("./soundResponse"), exports);
__exportStar(require("./sponsoredMerchant"), exports);
__exportStar(require("./storedValueAccountId"), exports);
__exportStar(require("./storedValueAccountStatus"), exports);
__exportStar(require("./storedValueAccountType"), exports);
__exportStar(require("./storedValueData"), exports);
__exportStar(require("./storedValueRequest"), exports);
__exportStar(require("./storedValueResponse"), exports);
__exportStar(require("./storedValueResult"), exports);
__exportStar(require("./storedValueTransactionType"), exports);
__exportStar(require("./terminalApiRequest"), exports);
__exportStar(require("./terminalApiResponse"), exports);
__exportStar(require("./terminalApiSecuredRequest"), exports);
__exportStar(require("./terminalApiSecuredResponse"), exports);
__exportStar(require("./terminalEnvironmentType"), exports);
__exportStar(require("./tokenRequestedType"), exports);
__exportStar(require("./totalDetailsType"), exports);
__exportStar(require("./totalFilter"), exports);
__exportStar(require("./trackData"), exports);
__exportStar(require("./trackFormatType"), exports);
__exportStar(require("./transactionActionType"), exports);
__exportStar(require("./transactionConditions"), exports);
__exportStar(require("./transactionIdentification"), exports);
__exportStar(require("./transactionStatusRequest"), exports);
__exportStar(require("./transactionStatusResponse"), exports);
__exportStar(require("./transactionToPerform"), exports);
__exportStar(require("./transactionTotals"), exports);
__exportStar(require("./transactionType"), exports);
__exportStar(require("./transmitRequest"), exports);
__exportStar(require("./transmitResponse"), exports);
__exportStar(require("./uTMCoordinates"), exports);
__exportStar(require("./unitOfMeasureType"), exports);
__exportStar(require("./versionType"), exports);
const abortRequest_1 = require("./abortRequest");
const accountType_1 = require("./accountType");
const adminRequest_1 = require("./adminRequest");
const adminResponse_1 = require("./adminResponse");
const algorithmIdentifier_1 = require("./algorithmIdentifier");
const algorithmType_1 = require("./algorithmType");
const alignmentType_1 = require("./alignmentType");
const allowedProduct_1 = require("./allowedProduct");
const amount_1 = require("./amount");
const amountsReq_1 = require("./amountsReq");
const amountsResp_1 = require("./amountsResp");
const applicationInfo_1 = require("./applicationInfo");
const areaSize_1 = require("./areaSize");
const authenticatedData_1 = require("./authenticatedData");
const authenticationMethodType_1 = require("./authenticationMethodType");
const balanceInquiryRequest_1 = require("./balanceInquiryRequest");
const balanceInquiryResponse_1 = require("./balanceInquiryResponse");
const barcodeType_1 = require("./barcodeType");
const batchRequest_1 = require("./batchRequest");
const batchResponse_1 = require("./batchResponse");
const capturedSignature_1 = require("./capturedSignature");
const cardAcquisitionRequest_1 = require("./cardAcquisitionRequest");
const cardAcquisitionResponse_1 = require("./cardAcquisitionResponse");
const cardAcquisitionTransaction_1 = require("./cardAcquisitionTransaction");
const cardData_1 = require("./cardData");
const cardReaderAPDURequest_1 = require("./cardReaderAPDURequest");
const cardReaderAPDUResponse_1 = require("./cardReaderAPDUResponse");
const cardReaderInitRequest_1 = require("./cardReaderInitRequest");
const cardReaderInitResponse_1 = require("./cardReaderInitResponse");
const cardReaderPowerOffRequest_1 = require("./cardReaderPowerOffRequest");
const cardReaderPowerOffResponse_1 = require("./cardReaderPowerOffResponse");
const cardholderPIN_1 = require("./cardholderPIN");
const cashHandlingDevice_1 = require("./cashHandlingDevice");
const characterHeightType_1 = require("./characterHeightType");
const characterStyleType_1 = require("./characterStyleType");
const characterWidthType_1 = require("./characterWidthType");
const checkData_1 = require("./checkData");
const checkTypeCodeType_1 = require("./checkTypeCodeType");
const coinsOrBills_1 = require("./coinsOrBills");
const colorType_1 = require("./colorType");
const commonField_1 = require("./commonField");
const contentInformation_1 = require("./contentInformation");
const contentType_1 = require("./contentType");
const currencyConversion_1 = require("./currencyConversion");
const customerOrder_1 = require("./customerOrder");
const customerOrderReqType_1 = require("./customerOrderReqType");
const deviceType_1 = require("./deviceType");
const diagnosisRequest_1 = require("./diagnosisRequest");
const diagnosisResponse_1 = require("./diagnosisResponse");
const digestedData_1 = require("./digestedData");
const displayOutput_1 = require("./displayOutput");
const displayRequest_1 = require("./displayRequest");
const displayResponse_1 = require("./displayResponse");
const documentQualifierType_1 = require("./documentQualifierType");
const enableServiceRequest_1 = require("./enableServiceRequest");
const enableServiceResponse_1 = require("./enableServiceResponse");
const encapsulatedContent_1 = require("./encapsulatedContent");
const encryptedContent_1 = require("./encryptedContent");
const entryModeType_1 = require("./entryModeType");
const envelopedData_1 = require("./envelopedData");
const errorConditionType_1 = require("./errorConditionType");
const eventNotification_1 = require("./eventNotification");
const eventToNotifyType_1 = require("./eventToNotifyType");
const externalPlatform_1 = require("./externalPlatform");
const forceEntryModeType_1 = require("./forceEntryModeType");
const genericProfileType_1 = require("./genericProfileType");
const geographicCoordinates_1 = require("./geographicCoordinates");
const geolocation_1 = require("./geolocation");
const getTotalsRequest_1 = require("./getTotalsRequest");
const getTotalsResponse_1 = require("./getTotalsResponse");
const globalStatusType_1 = require("./globalStatusType");
const hostStatus_1 = require("./hostStatus");
const iCCResetData_1 = require("./iCCResetData");
const identificationSupportType_1 = require("./identificationSupportType");
const identificationType_1 = require("./identificationType");
const infoQualifyType_1 = require("./infoQualifyType");
const input_1 = require("./input");
const inputCommandType_1 = require("./inputCommandType");
const inputData_1 = require("./inputData");
const inputRequest_1 = require("./inputRequest");
const inputResponse_1 = require("./inputResponse");
const inputResult_1 = require("./inputResult");
const inputUpdate_1 = require("./inputUpdate");
const instalment_1 = require("./instalment");
const instalmentType_1 = require("./instalmentType");
const issuer_1 = require("./issuer");
const issuerAndSerialNumber_1 = require("./issuerAndSerialNumber");
const loginRequest_1 = require("./loginRequest");
const loginResponse_1 = require("./loginResponse");
const logoutRequest_1 = require("./logoutRequest");
const logoutResponse_1 = require("./logoutResponse");
const loyaltyAccount_1 = require("./loyaltyAccount");
const loyaltyAccountId_1 = require("./loyaltyAccountId");
const loyaltyAccountReq_1 = require("./loyaltyAccountReq");
const loyaltyAccountStatus_1 = require("./loyaltyAccountStatus");
const loyaltyAcquirerData_1 = require("./loyaltyAcquirerData");
const loyaltyAmount_1 = require("./loyaltyAmount");
const loyaltyData_1 = require("./loyaltyData");
const loyaltyHandlingType_1 = require("./loyaltyHandlingType");
const loyaltyRequest_1 = require("./loyaltyRequest");
const loyaltyResponse_1 = require("./loyaltyResponse");
const loyaltyResult_1 = require("./loyaltyResult");
const loyaltyTotals_1 = require("./loyaltyTotals");
const loyaltyTransaction_1 = require("./loyaltyTransaction");
const loyaltyTransactionType_1 = require("./loyaltyTransactionType");
const loyaltyUnitType_1 = require("./loyaltyUnitType");
const menuEntry_1 = require("./menuEntry");
const menuEntryTagType_1 = require("./menuEntryTagType");
const merchantDevice_1 = require("./merchantDevice");
const messageCategoryType_1 = require("./messageCategoryType");
const messageClassType_1 = require("./messageClassType");
const messageHeader_1 = require("./messageHeader");
const messageReference_1 = require("./messageReference");
const messageType_1 = require("./messageType");
const mobileData_1 = require("./mobileData");
const namedKeyEncryptedData_1 = require("./namedKeyEncryptedData");
const nexoDerivedKey_1 = require("./nexoDerivedKey");
const originalPOITransaction_1 = require("./originalPOITransaction");
const outputBarcode_1 = require("./outputBarcode");
const outputContent_1 = require("./outputContent");
const outputFormatType_1 = require("./outputFormatType");
const outputResult_1 = require("./outputResult");
const outputText_1 = require("./outputText");
const pINFormatType_1 = require("./pINFormatType");
const pINRequest_1 = require("./pINRequest");
const pINRequestType_1 = require("./pINRequestType");
const pINResponse_1 = require("./pINResponse");
const pOICapabilitiesType_1 = require("./pOICapabilitiesType");
const pOIData_1 = require("./pOIData");
const pOIProfile_1 = require("./pOIProfile");
const pOISoftware_1 = require("./pOISoftware");
const pOIStatus_1 = require("./pOIStatus");
const pOISystemData_1 = require("./pOISystemData");
const pOITerminalData_1 = require("./pOITerminalData");
const parameter_1 = require("./parameter");
const paymentAccountReq_1 = require("./paymentAccountReq");
const paymentAccountStatus_1 = require("./paymentAccountStatus");
const paymentAcquirerData_1 = require("./paymentAcquirerData");
const paymentData_1 = require("./paymentData");
const paymentInstrumentData_1 = require("./paymentInstrumentData");
const paymentInstrumentType_1 = require("./paymentInstrumentType");
const paymentReceipt_1 = require("./paymentReceipt");
const paymentRequest_1 = require("./paymentRequest");
const paymentResponse_1 = require("./paymentResponse");
const paymentResult_1 = require("./paymentResult");
const paymentToken_1 = require("./paymentToken");
const paymentTotals_1 = require("./paymentTotals");
const paymentTransaction_1 = require("./paymentTransaction");
const paymentType_1 = require("./paymentType");
const performedTransaction_1 = require("./performedTransaction");
const periodUnitType_1 = require("./periodUnitType");
const predefinedContent_1 = require("./predefinedContent");
const printOutput_1 = require("./printOutput");
const printRequest_1 = require("./printRequest");
const printResponse_1 = require("./printResponse");
const printerStatusType_1 = require("./printerStatusType");
const rebates_1 = require("./rebates");
const reconciliationRequest_1 = require("./reconciliationRequest");
const reconciliationResponse_1 = require("./reconciliationResponse");
const reconciliationType_1 = require("./reconciliationType");
const relativeDistinguishedName_1 = require("./relativeDistinguishedName");
const repeatedMessageResponse_1 = require("./repeatedMessageResponse");
const repeatedResponseMessageBody_1 = require("./repeatedResponseMessageBody");
const response_1 = require("./response");
const responseModeType_1 = require("./responseModeType");
const resultType_1 = require("./resultType");
const reversalReasonType_1 = require("./reversalReasonType");
const reversalRequest_1 = require("./reversalRequest");
const reversalResponse_1 = require("./reversalResponse");
const saleCapabilitiesType_1 = require("./saleCapabilitiesType");
const saleData_1 = require("./saleData");
const saleItem_1 = require("./saleItem");
const saleItemRebate_1 = require("./saleItemRebate");
const saleProfile_1 = require("./saleProfile");
const saleSoftware_1 = require("./saleSoftware");
const saleTerminalData_1 = require("./saleTerminalData");
const saleToAcquirerData_1 = require("./saleToAcquirerData");
const saleToIssuerData_1 = require("./saleToIssuerData");
const saleToPOIRequest_1 = require("./saleToPOIRequest");
const saleToPOIResponse_1 = require("./saleToPOIResponse");
const saleToPOISecuredMessage_1 = require("./saleToPOISecuredMessage");
const securityKey_1 = require("./securityKey");
const securityTrailer_1 = require("./securityTrailer");
const sensitiveCardData_1 = require("./sensitiveCardData");
const sensitiveMobileData_1 = require("./sensitiveMobileData");
const serviceProfilesType_1 = require("./serviceProfilesType");
const servicesEnabledType_1 = require("./servicesEnabledType");
const shopperInteractionDevice_1 = require("./shopperInteractionDevice");
const signaturePoint_1 = require("./signaturePoint");
const signedData_1 = require("./signedData");
const signer_1 = require("./signer");
const signerIdentifier_1 = require("./signerIdentifier");
const soundActionType_1 = require("./soundActionType");
const soundContent_1 = require("./soundContent");
const soundFormatType_1 = require("./soundFormatType");
const soundRequest_1 = require("./soundRequest");
const soundResponse_1 = require("./soundResponse");
const sponsoredMerchant_1 = require("./sponsoredMerchant");
const storedValueAccountId_1 = require("./storedValueAccountId");
const storedValueAccountStatus_1 = require("./storedValueAccountStatus");
const storedValueAccountType_1 = require("./storedValueAccountType");
const storedValueData_1 = require("./storedValueData");
const storedValueRequest_1 = require("./storedValueRequest");
const storedValueResponse_1 = require("./storedValueResponse");
const storedValueResult_1 = require("./storedValueResult");
const storedValueTransactionType_1 = require("./storedValueTransactionType");
const terminalApiRequest_1 = require("./terminalApiRequest");
const terminalApiResponse_1 = require("./terminalApiResponse");
const terminalApiSecuredRequest_1 = require("./terminalApiSecuredRequest");
const terminalApiSecuredResponse_1 = require("./terminalApiSecuredResponse");
const terminalEnvironmentType_1 = require("./terminalEnvironmentType");
const tokenRequestedType_1 = require("./tokenRequestedType");
const totalDetailsType_1 = require("./totalDetailsType");
const totalFilter_1 = require("./totalFilter");
const trackData_1 = require("./trackData");
const trackFormatType_1 = require("./trackFormatType");
const transactionActionType_1 = require("./transactionActionType");
const transactionConditions_1 = require("./transactionConditions");
const transactionIdentification_1 = require("./transactionIdentification");
const transactionStatusRequest_1 = require("./transactionStatusRequest");
const transactionStatusResponse_1 = require("./transactionStatusResponse");
const transactionToPerform_1 = require("./transactionToPerform");
const transactionTotals_1 = require("./transactionTotals");
const transactionType_1 = require("./transactionType");
const transmitRequest_1 = require("./transmitRequest");
const transmitResponse_1 = require("./transmitResponse");
const uTMCoordinates_1 = require("./uTMCoordinates");
const unitOfMeasureType_1 = require("./unitOfMeasureType");
const versionType_1 = require("./versionType");
/* tslint:disable:no-unused-variable */
const primitives = [
    "string",
    "boolean",
    "double",
    "integer",
    "long",
    "float",
    "number",
    "any"
];
const enumsMap = {
    "AccountType": accountType_1.AccountType,
    "AlgorithmType": algorithmType_1.AlgorithmType,
    "AlignmentType": alignmentType_1.AlignmentType,
    "AuthenticatedData.VersionEnum": authenticatedData_1.AuthenticatedData.VersionEnum,
    "AuthenticationMethodType": authenticationMethodType_1.AuthenticationMethodType,
    "BarcodeType": barcodeType_1.BarcodeType,
    "CardAcquisitionTransaction.ForceEntryModeEnum": cardAcquisitionTransaction_1.CardAcquisitionTransaction.ForceEntryModeEnum,
    "CardAcquisitionTransaction.LoyaltyHandlingEnum": cardAcquisitionTransaction_1.CardAcquisitionTransaction.LoyaltyHandlingEnum,
    "CardAcquisitionTransaction.PaymentTypeEnum": cardAcquisitionTransaction_1.CardAcquisitionTransaction.PaymentTypeEnum,
    "CardData.EntryModeEnum": cardData_1.CardData.EntryModeEnum,
    "CardReaderInitRequest.ForceEntryModeEnum": cardReaderInitRequest_1.CardReaderInitRequest.ForceEntryModeEnum,
    "CardReaderInitResponse.EntryModeEnum": cardReaderInitResponse_1.CardReaderInitResponse.EntryModeEnum,
    "CharacterHeightType": characterHeightType_1.CharacterHeightType,
    "CharacterStyleType": characterStyleType_1.CharacterStyleType,
    "CharacterWidthType": characterWidthType_1.CharacterWidthType,
    "CheckData.TypeCodeEnum": checkData_1.CheckData.TypeCodeEnum,
    "CheckTypeCodeType": checkTypeCodeType_1.CheckTypeCodeType,
    "ColorType": colorType_1.ColorType,
    "ContentType": contentType_1.ContentType,
    "CustomerOrderReqType": customerOrderReqType_1.CustomerOrderReqType,
    "DeviceType": deviceType_1.DeviceType,
    "DigestedData.VersionEnum": digestedData_1.DigestedData.VersionEnum,
    "DocumentQualifierType": documentQualifierType_1.DocumentQualifierType,
    "EnableServiceRequest.ServicesEnabledEnum": enableServiceRequest_1.EnableServiceRequest.ServicesEnabledEnum,
    "EntryModeType": entryModeType_1.EntryModeType,
    "EnvelopedData.VersionEnum": envelopedData_1.EnvelopedData.VersionEnum,
    "ErrorConditionType": errorConditionType_1.ErrorConditionType,
    "EventToNotifyType": eventToNotifyType_1.EventToNotifyType,
    "ForceEntryModeType": forceEntryModeType_1.ForceEntryModeType,
    "GenericProfileType": genericProfileType_1.GenericProfileType,
    "GetTotalsRequest.TotalDetailsEnum": getTotalsRequest_1.GetTotalsRequest.TotalDetailsEnum,
    "GlobalStatusType": globalStatusType_1.GlobalStatusType,
    "IdentificationSupportType": identificationSupportType_1.IdentificationSupportType,
    "IdentificationType": identificationType_1.IdentificationType,
    "InfoQualifyType": infoQualifyType_1.InfoQualifyType,
    "InputCommandType": inputCommandType_1.InputCommandType,
    "Instalment.InstalmentTypeEnum": instalment_1.Instalment.InstalmentTypeEnum,
    "Instalment.PeriodUnitEnum": instalment_1.Instalment.PeriodUnitEnum,
    "InstalmentType": instalmentType_1.InstalmentType,
    "LoginRequest.CustomerOrderReqEnum": loginRequest_1.LoginRequest.CustomerOrderReqEnum,
    "LoginRequest.TokenRequestedTypeEnum": loginRequest_1.LoginRequest.TokenRequestedTypeEnum,
    "LoyaltyAccountId.EntryModeEnum": loyaltyAccountId_1.LoyaltyAccountId.EntryModeEnum,
    "LoyaltyAccountId.IdentificationSupportEnum": loyaltyAccountId_1.LoyaltyAccountId.IdentificationSupportEnum,
    "LoyaltyAccountStatus.LoyaltyUnitEnum": loyaltyAccountStatus_1.LoyaltyAccountStatus.LoyaltyUnitEnum,
    "LoyaltyAmount.LoyaltyUnitEnum": loyaltyAmount_1.LoyaltyAmount.LoyaltyUnitEnum,
    "LoyaltyHandlingType": loyaltyHandlingType_1.LoyaltyHandlingType,
    "LoyaltyTransactionType": loyaltyTransactionType_1.LoyaltyTransactionType,
    "LoyaltyUnitType": loyaltyUnitType_1.LoyaltyUnitType,
    "MenuEntry.MenuEntryTagEnum": menuEntry_1.MenuEntry.MenuEntryTagEnum,
    "MenuEntryTagType": menuEntryTagType_1.MenuEntryTagType,
    "MessageCategoryType": messageCategoryType_1.MessageCategoryType,
    "MessageClassType": messageClassType_1.MessageClassType,
    "MessageReference.MessageCategoryEnum": messageReference_1.MessageReference.MessageCategoryEnum,
    "MessageType": messageType_1.MessageType,
    "NamedKeyEncryptedData.VersionEnum": namedKeyEncryptedData_1.NamedKeyEncryptedData.VersionEnum,
    "OutputBarcode.BarcodeTypeEnum": outputBarcode_1.OutputBarcode.BarcodeTypeEnum,
    "OutputFormatType": outputFormatType_1.OutputFormatType,
    "OutputText.AlignmentEnum": outputText_1.OutputText.AlignmentEnum,
    "OutputText.CharacterHeightEnum": outputText_1.OutputText.CharacterHeightEnum,
    "OutputText.CharacterStyleEnum": outputText_1.OutputText.CharacterStyleEnum,
    "OutputText.CharacterWidthEnum": outputText_1.OutputText.CharacterWidthEnum,
    "OutputText.ColorEnum": outputText_1.OutputText.ColorEnum,
    "PINFormatType": pINFormatType_1.PINFormatType,
    "PINRequest.PINFormatEnum": pINRequest_1.PINRequest.PINFormatEnum,
    "PINRequestType": pINRequestType_1.PINRequestType,
    "POICapabilitiesType": pOICapabilitiesType_1.POICapabilitiesType,
    "POIProfile.GenericProfileEnum": pOIProfile_1.POIProfile.GenericProfileEnum,
    "POIProfile.ServiceProfilesEnum": pOIProfile_1.POIProfile.ServiceProfilesEnum,
    "POIStatus.PrinterStatusEnum": pOIStatus_1.POIStatus.PrinterStatusEnum,
    "POITerminalData.POICapabilitiesEnum": pOITerminalData_1.POITerminalData.POICapabilitiesEnum,
    "PaymentAccountReq.AccountTypeEnum": paymentAccountReq_1.PaymentAccountReq.AccountTypeEnum,
    "PaymentData.PaymentTypeEnum": paymentData_1.PaymentData.PaymentTypeEnum,
    "PaymentInstrumentType": paymentInstrumentType_1.PaymentInstrumentType,
    "PaymentResult.AuthenticationMethodEnum": paymentResult_1.PaymentResult.AuthenticationMethodEnum,
    "PaymentResult.PaymentTypeEnum": paymentResult_1.PaymentResult.PaymentTypeEnum,
    "PaymentType": paymentType_1.PaymentType,
    "PeriodUnitType": periodUnitType_1.PeriodUnitType,
    "PrinterStatusType": printerStatusType_1.PrinterStatusType,
    "ReconciliationType": reconciliationType_1.ReconciliationType,
    "Response.ErrorConditionEnum": response_1.Response.ErrorConditionEnum,
    "ResponseModeType": responseModeType_1.ResponseModeType,
    "ResultType": resultType_1.ResultType,
    "ReversalReasonType": reversalReasonType_1.ReversalReasonType,
    "SaleCapabilitiesType": saleCapabilitiesType_1.SaleCapabilitiesType,
    "SaleData.CustomerOrderReqEnum": saleData_1.SaleData.CustomerOrderReqEnum,
    "SaleData.TokenRequestedTypeEnum": saleData_1.SaleData.TokenRequestedTypeEnum,
    "SaleItem.UnitOfMeasureEnum": saleItem_1.SaleItem.UnitOfMeasureEnum,
    "SaleItemRebate.UnitOfMeasureEnum": saleItemRebate_1.SaleItemRebate.UnitOfMeasureEnum,
    "SaleProfile.GenericProfileEnum": saleProfile_1.SaleProfile.GenericProfileEnum,
    "SaleProfile.ServiceProfilesEnum": saleProfile_1.SaleProfile.ServiceProfilesEnum,
    "SaleTerminalData.SaleCapabilitiesEnum": saleTerminalData_1.SaleTerminalData.SaleCapabilitiesEnum,
    "SaleTerminalData.TerminalEnvironmentEnum": saleTerminalData_1.SaleTerminalData.TerminalEnvironmentEnum,
    "ServiceProfilesType": serviceProfilesType_1.ServiceProfilesType,
    "ServicesEnabledType": servicesEnabledType_1.ServicesEnabledType,
    "SignedData.VersionEnum": signedData_1.SignedData.VersionEnum,
    "Signer.VersionEnum": signer_1.Signer.VersionEnum,
    "SoundActionType": soundActionType_1.SoundActionType,
    "SoundContent.SoundFormatEnum": soundContent_1.SoundContent.SoundFormatEnum,
    "SoundFormatType": soundFormatType_1.SoundFormatType,
    "SoundRequest.ResponseModeEnum": soundRequest_1.SoundRequest.ResponseModeEnum,
    "StoredValueAccountId.EntryModeEnum": storedValueAccountId_1.StoredValueAccountId.EntryModeEnum,
    "StoredValueAccountType": storedValueAccountType_1.StoredValueAccountType,
    "StoredValueTransactionType": storedValueTransactionType_1.StoredValueTransactionType,
    "TerminalEnvironmentType": terminalEnvironmentType_1.TerminalEnvironmentType,
    "TokenRequestedType": tokenRequestedType_1.TokenRequestedType,
    "TotalDetailsType": totalDetailsType_1.TotalDetailsType,
    "TrackData.TrackFormatEnum": trackData_1.TrackData.TrackFormatEnum,
    "TrackFormatType": trackFormatType_1.TrackFormatType,
    "TransactionActionType": transactionActionType_1.TransactionActionType,
    "TransactionConditions.ForceEntryModeEnum": transactionConditions_1.TransactionConditions.ForceEntryModeEnum,
    "TransactionConditions.LoyaltyHandlingEnum": transactionConditions_1.TransactionConditions.LoyaltyHandlingEnum,
    "TransactionStatusRequest.DocumentQualifierEnum": transactionStatusRequest_1.TransactionStatusRequest.DocumentQualifierEnum,
    "TransactionTotals.ErrorConditionEnum": transactionTotals_1.TransactionTotals.ErrorConditionEnum,
    "TransactionTotals.LoyaltyUnitEnum": transactionTotals_1.TransactionTotals.LoyaltyUnitEnum,
    "TransactionType": transactionType_1.TransactionType,
    "UnitOfMeasureType": unitOfMeasureType_1.UnitOfMeasureType,
    "VersionType": versionType_1.VersionType,
};
const typeMap = {
    "AbortRequest": abortRequest_1.AbortRequest,
    "AdminRequest": adminRequest_1.AdminRequest,
    "AdminResponse": adminResponse_1.AdminResponse,
    "AlgorithmIdentifier": algorithmIdentifier_1.AlgorithmIdentifier,
    "AllowedProduct": allowedProduct_1.AllowedProduct,
    "Amount": amount_1.Amount,
    "AmountsReq": amountsReq_1.AmountsReq,
    "AmountsResp": amountsResp_1.AmountsResp,
    "ApplicationInfo": applicationInfo_1.ApplicationInfo,
    "AreaSize": areaSize_1.AreaSize,
    "AuthenticatedData": authenticatedData_1.AuthenticatedData,
    "BalanceInquiryRequest": balanceInquiryRequest_1.BalanceInquiryRequest,
    "BalanceInquiryResponse": balanceInquiryResponse_1.BalanceInquiryResponse,
    "BatchRequest": batchRequest_1.BatchRequest,
    "BatchResponse": batchResponse_1.BatchResponse,
    "CapturedSignature": capturedSignature_1.CapturedSignature,
    "CardAcquisitionRequest": cardAcquisitionRequest_1.CardAcquisitionRequest,
    "CardAcquisitionResponse": cardAcquisitionResponse_1.CardAcquisitionResponse,
    "CardAcquisitionTransaction": cardAcquisitionTransaction_1.CardAcquisitionTransaction,
    "CardData": cardData_1.CardData,
    "CardReaderAPDURequest": cardReaderAPDURequest_1.CardReaderAPDURequest,
    "CardReaderAPDUResponse": cardReaderAPDUResponse_1.CardReaderAPDUResponse,
    "CardReaderInitRequest": cardReaderInitRequest_1.CardReaderInitRequest,
    "CardReaderInitResponse": cardReaderInitResponse_1.CardReaderInitResponse,
    "CardReaderPowerOffRequest": cardReaderPowerOffRequest_1.CardReaderPowerOffRequest,
    "CardReaderPowerOffResponse": cardReaderPowerOffResponse_1.CardReaderPowerOffResponse,
    "CardholderPIN": cardholderPIN_1.CardholderPIN,
    "CashHandlingDevice": cashHandlingDevice_1.CashHandlingDevice,
    "CheckData": checkData_1.CheckData,
    "CoinsOrBills": coinsOrBills_1.CoinsOrBills,
    "CommonField": commonField_1.CommonField,
    "ContentInformation": contentInformation_1.ContentInformation,
    "CurrencyConversion": currencyConversion_1.CurrencyConversion,
    "CustomerOrder": customerOrder_1.CustomerOrder,
    "DiagnosisRequest": diagnosisRequest_1.DiagnosisRequest,
    "DiagnosisResponse": diagnosisResponse_1.DiagnosisResponse,
    "DigestedData": digestedData_1.DigestedData,
    "DisplayOutput": displayOutput_1.DisplayOutput,
    "DisplayRequest": displayRequest_1.DisplayRequest,
    "DisplayResponse": displayResponse_1.DisplayResponse,
    "EnableServiceRequest": enableServiceRequest_1.EnableServiceRequest,
    "EnableServiceResponse": enableServiceResponse_1.EnableServiceResponse,
    "EncapsulatedContent": encapsulatedContent_1.EncapsulatedContent,
    "EncryptedContent": encryptedContent_1.EncryptedContent,
    "EnvelopedData": envelopedData_1.EnvelopedData,
    "EventNotification": eventNotification_1.EventNotification,
    "ExternalPlatform": externalPlatform_1.ExternalPlatform,
    "GeographicCoordinates": geographicCoordinates_1.GeographicCoordinates,
    "Geolocation": geolocation_1.Geolocation,
    "GetTotalsRequest": getTotalsRequest_1.GetTotalsRequest,
    "GetTotalsResponse": getTotalsResponse_1.GetTotalsResponse,
    "HostStatus": hostStatus_1.HostStatus,
    "ICCResetData": iCCResetData_1.ICCResetData,
    "Input": input_1.Input,
    "InputData": inputData_1.InputData,
    "InputRequest": inputRequest_1.InputRequest,
    "InputResponse": inputResponse_1.InputResponse,
    "InputResult": inputResult_1.InputResult,
    "InputUpdate": inputUpdate_1.InputUpdate,
    "Instalment": instalment_1.Instalment,
    "Issuer": issuer_1.Issuer,
    "IssuerAndSerialNumber": issuerAndSerialNumber_1.IssuerAndSerialNumber,
    "LoginRequest": loginRequest_1.LoginRequest,
    "LoginResponse": loginResponse_1.LoginResponse,
    "LogoutRequest": logoutRequest_1.LogoutRequest,
    "LogoutResponse": logoutResponse_1.LogoutResponse,
    "LoyaltyAccount": loyaltyAccount_1.LoyaltyAccount,
    "LoyaltyAccountId": loyaltyAccountId_1.LoyaltyAccountId,
    "LoyaltyAccountReq": loyaltyAccountReq_1.LoyaltyAccountReq,
    "LoyaltyAccountStatus": loyaltyAccountStatus_1.LoyaltyAccountStatus,
    "LoyaltyAcquirerData": loyaltyAcquirerData_1.LoyaltyAcquirerData,
    "LoyaltyAmount": loyaltyAmount_1.LoyaltyAmount,
    "LoyaltyData": loyaltyData_1.LoyaltyData,
    "LoyaltyRequest": loyaltyRequest_1.LoyaltyRequest,
    "LoyaltyResponse": loyaltyResponse_1.LoyaltyResponse,
    "LoyaltyResult": loyaltyResult_1.LoyaltyResult,
    "LoyaltyTotals": loyaltyTotals_1.LoyaltyTotals,
    "LoyaltyTransaction": loyaltyTransaction_1.LoyaltyTransaction,
    "MenuEntry": menuEntry_1.MenuEntry,
    "MerchantDevice": merchantDevice_1.MerchantDevice,
    "MessageHeader": messageHeader_1.MessageHeader,
    "MessageReference": messageReference_1.MessageReference,
    "MobileData": mobileData_1.MobileData,
    "NamedKeyEncryptedData": namedKeyEncryptedData_1.NamedKeyEncryptedData,
    "NexoDerivedKey": nexoDerivedKey_1.NexoDerivedKey,
    "OriginalPOITransaction": originalPOITransaction_1.OriginalPOITransaction,
    "OutputBarcode": outputBarcode_1.OutputBarcode,
    "OutputContent": outputContent_1.OutputContent,
    "OutputResult": outputResult_1.OutputResult,
    "OutputText": outputText_1.OutputText,
    "PINRequest": pINRequest_1.PINRequest,
    "PINResponse": pINResponse_1.PINResponse,
    "POIData": pOIData_1.POIData,
    "POIProfile": pOIProfile_1.POIProfile,
    "POISoftware": pOISoftware_1.POISoftware,
    "POIStatus": pOIStatus_1.POIStatus,
    "POISystemData": pOISystemData_1.POISystemData,
    "POITerminalData": pOITerminalData_1.POITerminalData,
    "Parameter": parameter_1.Parameter,
    "PaymentAccountReq": paymentAccountReq_1.PaymentAccountReq,
    "PaymentAccountStatus": paymentAccountStatus_1.PaymentAccountStatus,
    "PaymentAcquirerData": paymentAcquirerData_1.PaymentAcquirerData,
    "PaymentData": paymentData_1.PaymentData,
    "PaymentInstrumentData": paymentInstrumentData_1.PaymentInstrumentData,
    "PaymentReceipt": paymentReceipt_1.PaymentReceipt,
    "PaymentRequest": paymentRequest_1.PaymentRequest,
    "PaymentResponse": paymentResponse_1.PaymentResponse,
    "PaymentResult": paymentResult_1.PaymentResult,
    "PaymentToken": paymentToken_1.PaymentToken,
    "PaymentTotals": paymentTotals_1.PaymentTotals,
    "PaymentTransaction": paymentTransaction_1.PaymentTransaction,
    "PerformedTransaction": performedTransaction_1.PerformedTransaction,
    "PredefinedContent": predefinedContent_1.PredefinedContent,
    "PrintOutput": printOutput_1.PrintOutput,
    "PrintRequest": printRequest_1.PrintRequest,
    "PrintResponse": printResponse_1.PrintResponse,
    "Rebates": rebates_1.Rebates,
    "ReconciliationRequest": reconciliationRequest_1.ReconciliationRequest,
    "ReconciliationResponse": reconciliationResponse_1.ReconciliationResponse,
    "RelativeDistinguishedName": relativeDistinguishedName_1.RelativeDistinguishedName,
    "RepeatedMessageResponse": repeatedMessageResponse_1.RepeatedMessageResponse,
    "RepeatedResponseMessageBody": repeatedResponseMessageBody_1.RepeatedResponseMessageBody,
    "Response": response_1.Response,
    "ReversalRequest": reversalRequest_1.ReversalRequest,
    "ReversalResponse": reversalResponse_1.ReversalResponse,
    "SaleData": saleData_1.SaleData,
    "SaleItem": saleItem_1.SaleItem,
    "SaleItemRebate": saleItemRebate_1.SaleItemRebate,
    "SaleProfile": saleProfile_1.SaleProfile,
    "SaleSoftware": saleSoftware_1.SaleSoftware,
    "SaleTerminalData": saleTerminalData_1.SaleTerminalData,
    "SaleToAcquirerData": saleToAcquirerData_1.SaleToAcquirerData,
    "SaleToIssuerData": saleToIssuerData_1.SaleToIssuerData,
    "SaleToPOIRequest": saleToPOIRequest_1.SaleToPOIRequest,
    "SaleToPOIResponse": saleToPOIResponse_1.SaleToPOIResponse,
    "SaleToPOISecuredMessage": saleToPOISecuredMessage_1.SaleToPOISecuredMessage,
    "SecurityKey": securityKey_1.SecurityKey,
    "SecurityTrailer": securityTrailer_1.SecurityTrailer,
    "SensitiveCardData": sensitiveCardData_1.SensitiveCardData,
    "SensitiveMobileData": sensitiveMobileData_1.SensitiveMobileData,
    "ShopperInteractionDevice": shopperInteractionDevice_1.ShopperInteractionDevice,
    "SignaturePoint": signaturePoint_1.SignaturePoint,
    "SignedData": signedData_1.SignedData,
    "Signer": signer_1.Signer,
    "SignerIdentifier": signerIdentifier_1.SignerIdentifier,
    "SoundContent": soundContent_1.SoundContent,
    "SoundRequest": soundRequest_1.SoundRequest,
    "SoundResponse": soundResponse_1.SoundResponse,
    "SponsoredMerchant": sponsoredMerchant_1.SponsoredMerchant,
    "StoredValueAccountId": storedValueAccountId_1.StoredValueAccountId,
    "StoredValueAccountStatus": storedValueAccountStatus_1.StoredValueAccountStatus,
    "StoredValueData": storedValueData_1.StoredValueData,
    "StoredValueRequest": storedValueRequest_1.StoredValueRequest,
    "StoredValueResponse": storedValueResponse_1.StoredValueResponse,
    "StoredValueResult": storedValueResult_1.StoredValueResult,
    "TerminalApiRequest": terminalApiRequest_1.TerminalApiRequest,
    "TerminalApiResponse": terminalApiResponse_1.TerminalApiResponse,
    "TerminalApiSecuredRequest": terminalApiSecuredRequest_1.TerminalApiSecuredRequest,
    "TerminalApiSecuredResponse": terminalApiSecuredResponse_1.TerminalApiSecuredResponse,
    "TotalFilter": totalFilter_1.TotalFilter,
    "TrackData": trackData_1.TrackData,
    "TransactionConditions": transactionConditions_1.TransactionConditions,
    "TransactionIdentification": transactionIdentification_1.TransactionIdentification,
    "TransactionStatusRequest": transactionStatusRequest_1.TransactionStatusRequest,
    "TransactionStatusResponse": transactionStatusResponse_1.TransactionStatusResponse,
    "TransactionToPerform": transactionToPerform_1.TransactionToPerform,
    "TransactionTotals": transactionTotals_1.TransactionTotals,
    "TransmitRequest": transmitRequest_1.TransmitRequest,
    "TransmitResponse": transmitResponse_1.TransmitResponse,
    "UTMCoordinates": uTMCoordinates_1.UTMCoordinates,
};
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }
            // Check the discriminator
            const discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == undefined) {
                return expectedType; // the type does not have a discriminator. use it.
            }
            else {
                if (data[discriminatorProperty]) {
                    const discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType; // use the type given in the discriminator
                    }
                    else {
                        return expectedType; // discriminator did not map to a type
                    }
                }
                else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }
    static serialize(data, type) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            const transformedData = [];
            for (const index in data) {
                const date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return data.toISOString();
        }
        else if (type === "SaleToAcquirerData") {
            if (typeof data === 'string') {
                return data; // splits payment for terminal
            }
            const dataString = JSON.stringify(data);
            return Buffer.from(dataString).toString("base64");
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }
            // Get the actual type of this object
            type = this.findCorrectType(data, type);
            // get the map for the correct type.
            const attributeTypes = typeMap[type].getAttributeTypeMap();
            const instance = {};
            for (const index in attributeTypes) {
                const attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }
    static deserialize(data, type) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            const transformedData = [];
            for (const index in data) {
                const date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap[type]) { // is Enum
                return data;
            }
            if (!typeMap[type]) { // dont know the type
                return data;
            }
            const instance = new typeMap[type]();
            const attributeTypes = typeMap[type].getAttributeTypeMap();
            for (const index in attributeTypes) {
                const attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}
exports.ObjectSerializer = ObjectSerializer;
//# sourceMappingURL=models.js.map