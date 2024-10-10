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
exports.PaymentAcquirerData = void 0;
class PaymentAcquirerData {
    static getAttributeTypeMap() {
        return PaymentAcquirerData.attributeTypeMap;
    }
}
exports.PaymentAcquirerData = PaymentAcquirerData;
PaymentAcquirerData.discriminator = undefined;
PaymentAcquirerData.attributeTypeMap = [
    {
        "name": "AcquirerID",
        "baseName": "AcquirerID",
        "type": "string"
    },
    {
        "name": "AcquirerPOIID",
        "baseName": "AcquirerPOIID",
        "type": "string"
    },
    {
        "name": "AcquirerTransactionID",
        "baseName": "AcquirerTransactionID",
        "type": "TransactionIdentification"
    },
    {
        "name": "ApprovalCode",
        "baseName": "ApprovalCode",
        "type": "string"
    },
    {
        "name": "MerchantID",
        "baseName": "MerchantID",
        "type": "string"
    }
];
//# sourceMappingURL=paymentAcquirerData.js.map