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
exports.PaymentTransaction = void 0;
class PaymentTransaction {
    static getAttributeTypeMap() {
        return PaymentTransaction.attributeTypeMap;
    }
}
exports.PaymentTransaction = PaymentTransaction;
PaymentTransaction.discriminator = undefined;
PaymentTransaction.attributeTypeMap = [
    {
        "name": "AmountsReq",
        "baseName": "AmountsReq",
        "type": "AmountsReq"
    },
    {
        "name": "OriginalPOITransaction",
        "baseName": "OriginalPOITransaction",
        "type": "OriginalPOITransaction"
    },
    {
        "name": "SaleItem",
        "baseName": "SaleItem",
        "type": "Array<SaleItem>"
    },
    {
        "name": "TransactionConditions",
        "baseName": "TransactionConditions",
        "type": "TransactionConditions"
    }
];
//# sourceMappingURL=paymentTransaction.js.map