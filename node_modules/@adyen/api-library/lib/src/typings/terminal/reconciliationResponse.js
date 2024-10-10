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
exports.ReconciliationResponse = void 0;
class ReconciliationResponse {
    static getAttributeTypeMap() {
        return ReconciliationResponse.attributeTypeMap;
    }
}
exports.ReconciliationResponse = ReconciliationResponse;
ReconciliationResponse.discriminator = undefined;
ReconciliationResponse.attributeTypeMap = [
    {
        "name": "POIReconciliationID",
        "baseName": "POIReconciliationID",
        "type": "string"
    },
    {
        "name": "ReconciliationType",
        "baseName": "ReconciliationType",
        "type": "ReconciliationType"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    },
    {
        "name": "TransactionTotals",
        "baseName": "TransactionTotals",
        "type": "Array<TransactionTotals>"
    }
];
//# sourceMappingURL=reconciliationResponse.js.map