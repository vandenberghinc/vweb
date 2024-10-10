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
exports.LoyaltyTransaction = void 0;
class LoyaltyTransaction {
    static getAttributeTypeMap() {
        return LoyaltyTransaction.attributeTypeMap;
    }
}
exports.LoyaltyTransaction = LoyaltyTransaction;
LoyaltyTransaction.discriminator = undefined;
LoyaltyTransaction.attributeTypeMap = [
    {
        "name": "Currency",
        "baseName": "Currency",
        "type": "string"
    },
    {
        "name": "LoyaltyTransactionType",
        "baseName": "LoyaltyTransactionType",
        "type": "LoyaltyTransactionType"
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
        "name": "TotalAmount",
        "baseName": "TotalAmount",
        "type": "number"
    },
    {
        "name": "TransactionConditions",
        "baseName": "TransactionConditions",
        "type": "TransactionConditions"
    }
];
//# sourceMappingURL=loyaltyTransaction.js.map