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
exports.LoyaltyTotals = void 0;
class LoyaltyTotals {
    static getAttributeTypeMap() {
        return LoyaltyTotals.attributeTypeMap;
    }
}
exports.LoyaltyTotals = LoyaltyTotals;
LoyaltyTotals.discriminator = undefined;
LoyaltyTotals.attributeTypeMap = [
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
//# sourceMappingURL=loyaltyTotals.js.map