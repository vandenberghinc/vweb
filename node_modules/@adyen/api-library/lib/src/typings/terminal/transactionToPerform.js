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
exports.TransactionToPerform = void 0;
class TransactionToPerform {
    static getAttributeTypeMap() {
        return TransactionToPerform.attributeTypeMap;
    }
}
exports.TransactionToPerform = TransactionToPerform;
TransactionToPerform.discriminator = undefined;
TransactionToPerform.attributeTypeMap = [
    {
        "name": "LoyaltyRequest",
        "baseName": "LoyaltyRequest",
        "type": "LoyaltyRequest"
    },
    {
        "name": "PaymentRequest",
        "baseName": "PaymentRequest",
        "type": "PaymentRequest"
    },
    {
        "name": "ReversalRequest",
        "baseName": "ReversalRequest",
        "type": "ReversalRequest"
    }
];
//# sourceMappingURL=transactionToPerform.js.map