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
exports.PaymentTotals = void 0;
class PaymentTotals {
    static getAttributeTypeMap() {
        return PaymentTotals.attributeTypeMap;
    }
}
exports.PaymentTotals = PaymentTotals;
PaymentTotals.discriminator = undefined;
PaymentTotals.attributeTypeMap = [
    {
        "name": "TransactionAmount",
        "baseName": "TransactionAmount",
        "type": "number"
    },
    {
        "name": "TransactionCount",
        "baseName": "TransactionCount",
        "type": "number"
    },
    {
        "name": "TransactionType",
        "baseName": "TransactionType",
        "type": "TransactionType"
    }
];
//# sourceMappingURL=paymentTotals.js.map