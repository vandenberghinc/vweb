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
exports.SaleData = void 0;
class SaleData {
    static getAttributeTypeMap() {
        return SaleData.attributeTypeMap;
    }
}
exports.SaleData = SaleData;
SaleData.discriminator = undefined;
SaleData.attributeTypeMap = [
    {
        "name": "CustomerOrderID",
        "baseName": "CustomerOrderID",
        "type": "string"
    },
    {
        "name": "CustomerOrderReq",
        "baseName": "CustomerOrderReq",
        "type": "Array<SaleData.CustomerOrderReqEnum>"
    },
    {
        "name": "OperatorID",
        "baseName": "OperatorID",
        "type": "string"
    },
    {
        "name": "OperatorLanguage",
        "baseName": "OperatorLanguage",
        "type": "string"
    },
    {
        "name": "SaleReferenceID",
        "baseName": "SaleReferenceID",
        "type": "string"
    },
    {
        "name": "SaleTerminalData",
        "baseName": "SaleTerminalData",
        "type": "SaleTerminalData"
    },
    {
        "name": "SaleToAcquirerData",
        "baseName": "SaleToAcquirerData",
        "type": "SaleToAcquirerData"
    },
    {
        "name": "SaleToIssuerData",
        "baseName": "SaleToIssuerData",
        "type": "SaleToIssuerData"
    },
    {
        "name": "SaleToPOIData",
        "baseName": "SaleToPOIData",
        "type": "string"
    },
    {
        "name": "SaleTransactionID",
        "baseName": "SaleTransactionID",
        "type": "TransactionIdentification"
    },
    {
        "name": "ShiftNumber",
        "baseName": "ShiftNumber",
        "type": "string"
    },
    {
        "name": "SponsoredMerchant",
        "baseName": "SponsoredMerchant",
        "type": "Array<SponsoredMerchant>"
    },
    {
        "name": "TokenRequestedType",
        "baseName": "TokenRequestedType",
        "type": "SaleData.TokenRequestedTypeEnum"
    }
];
(function (SaleData) {
    let CustomerOrderReqEnum;
    (function (CustomerOrderReqEnum) {
        CustomerOrderReqEnum[CustomerOrderReqEnum["Both"] = 'Both'] = "Both";
        CustomerOrderReqEnum[CustomerOrderReqEnum["Closed"] = 'Closed'] = "Closed";
        CustomerOrderReqEnum[CustomerOrderReqEnum["Open"] = 'Open'] = "Open";
    })(CustomerOrderReqEnum = SaleData.CustomerOrderReqEnum || (SaleData.CustomerOrderReqEnum = {}));
    let TokenRequestedTypeEnum;
    (function (TokenRequestedTypeEnum) {
        TokenRequestedTypeEnum[TokenRequestedTypeEnum["Customer"] = 'Customer'] = "Customer";
        TokenRequestedTypeEnum[TokenRequestedTypeEnum["Transaction"] = 'Transaction'] = "Transaction";
    })(TokenRequestedTypeEnum = SaleData.TokenRequestedTypeEnum || (SaleData.TokenRequestedTypeEnum = {}));
})(SaleData = exports.SaleData || (exports.SaleData = {}));
//# sourceMappingURL=saleData.js.map