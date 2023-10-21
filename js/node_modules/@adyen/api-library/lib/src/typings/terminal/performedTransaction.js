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
exports.PerformedTransaction = void 0;
class PerformedTransaction {
    static getAttributeTypeMap() {
        return PerformedTransaction.attributeTypeMap;
    }
}
exports.PerformedTransaction = PerformedTransaction;
PerformedTransaction.discriminator = undefined;
PerformedTransaction.attributeTypeMap = [
    {
        "name": "LoyaltyResult",
        "baseName": "LoyaltyResult",
        "type": "Array<LoyaltyResult>"
    },
    {
        "name": "PaymentResult",
        "baseName": "PaymentResult",
        "type": "PaymentResult"
    },
    {
        "name": "POIData",
        "baseName": "POIData",
        "type": "POIData"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    },
    {
        "name": "ReversedAmount",
        "baseName": "ReversedAmount",
        "type": "number"
    },
    {
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData"
    }
];
//# sourceMappingURL=performedTransaction.js.map