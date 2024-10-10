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
exports.GetTotalsResponse = void 0;
class GetTotalsResponse {
    static getAttributeTypeMap() {
        return GetTotalsResponse.attributeTypeMap;
    }
}
exports.GetTotalsResponse = GetTotalsResponse;
GetTotalsResponse.discriminator = undefined;
GetTotalsResponse.attributeTypeMap = [
    {
        "name": "POIReconciliationID",
        "baseName": "POIReconciliationID",
        "type": "string"
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
//# sourceMappingURL=getTotalsResponse.js.map