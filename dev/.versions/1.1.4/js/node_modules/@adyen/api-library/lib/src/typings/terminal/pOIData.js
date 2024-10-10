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
exports.POIData = void 0;
class POIData {
    static getAttributeTypeMap() {
        return POIData.attributeTypeMap;
    }
}
exports.POIData = POIData;
POIData.discriminator = undefined;
POIData.attributeTypeMap = [
    {
        "name": "POIReconciliationID",
        "baseName": "POIReconciliationID",
        "type": "string"
    },
    {
        "name": "POITransactionID",
        "baseName": "POITransactionID",
        "type": "TransactionIdentification"
    }
];
//# sourceMappingURL=pOIData.js.map