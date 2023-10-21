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
exports.TransactionStatusRequest = void 0;
class TransactionStatusRequest {
    static getAttributeTypeMap() {
        return TransactionStatusRequest.attributeTypeMap;
    }
}
exports.TransactionStatusRequest = TransactionStatusRequest;
TransactionStatusRequest.discriminator = undefined;
TransactionStatusRequest.attributeTypeMap = [
    {
        "name": "DocumentQualifier",
        "baseName": "DocumentQualifier",
        "type": "Array<TransactionStatusRequest.DocumentQualifierEnum>"
    },
    {
        "name": "MessageReference",
        "baseName": "MessageReference",
        "type": "MessageReference"
    },
    {
        "name": "ReceiptReprintFlag",
        "baseName": "ReceiptReprintFlag",
        "type": "boolean"
    }
];
(function (TransactionStatusRequest) {
    let DocumentQualifierEnum;
    (function (DocumentQualifierEnum) {
        DocumentQualifierEnum[DocumentQualifierEnum["CashierReceipt"] = 'CashierReceipt'] = "CashierReceipt";
        DocumentQualifierEnum[DocumentQualifierEnum["CustomerReceipt"] = 'CustomerReceipt'] = "CustomerReceipt";
        DocumentQualifierEnum[DocumentQualifierEnum["Document"] = 'Document'] = "Document";
        DocumentQualifierEnum[DocumentQualifierEnum["Journal"] = 'Journal'] = "Journal";
        DocumentQualifierEnum[DocumentQualifierEnum["SaleReceipt"] = 'SaleReceipt'] = "SaleReceipt";
        DocumentQualifierEnum[DocumentQualifierEnum["Voucher"] = 'Voucher'] = "Voucher";
    })(DocumentQualifierEnum = TransactionStatusRequest.DocumentQualifierEnum || (TransactionStatusRequest.DocumentQualifierEnum = {}));
})(TransactionStatusRequest = exports.TransactionStatusRequest || (exports.TransactionStatusRequest = {}));
//# sourceMappingURL=transactionStatusRequest.js.map