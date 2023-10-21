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
exports.LoyaltyAcquirerData = void 0;
class LoyaltyAcquirerData {
    static getAttributeTypeMap() {
        return LoyaltyAcquirerData.attributeTypeMap;
    }
}
exports.LoyaltyAcquirerData = LoyaltyAcquirerData;
LoyaltyAcquirerData.discriminator = undefined;
LoyaltyAcquirerData.attributeTypeMap = [
    {
        "name": "ApprovalCode",
        "baseName": "ApprovalCode",
        "type": "string"
    },
    {
        "name": "HostReconciliationID",
        "baseName": "HostReconciliationID",
        "type": "string"
    },
    {
        "name": "LoyaltyAcquirerID",
        "baseName": "LoyaltyAcquirerID",
        "type": "string"
    },
    {
        "name": "LoyaltyTransactionID",
        "baseName": "LoyaltyTransactionID",
        "type": "TransactionIdentification"
    }
];
//# sourceMappingURL=loyaltyAcquirerData.js.map