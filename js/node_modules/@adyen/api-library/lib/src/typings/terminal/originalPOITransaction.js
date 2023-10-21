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
exports.OriginalPOITransaction = void 0;
class OriginalPOITransaction {
    static getAttributeTypeMap() {
        return OriginalPOITransaction.attributeTypeMap;
    }
}
exports.OriginalPOITransaction = OriginalPOITransaction;
OriginalPOITransaction.discriminator = undefined;
OriginalPOITransaction.attributeTypeMap = [
    {
        "name": "AcquirerID",
        "baseName": "AcquirerID",
        "type": "string"
    },
    {
        "name": "ApprovalCode",
        "baseName": "ApprovalCode",
        "type": "string"
    },
    {
        "name": "CustomerLanguage",
        "baseName": "CustomerLanguage",
        "type": "string"
    },
    {
        "name": "HostTransactionID",
        "baseName": "HostTransactionID",
        "type": "TransactionIdentification"
    },
    {
        "name": "POIID",
        "baseName": "POIID",
        "type": "string"
    },
    {
        "name": "POITransactionID",
        "baseName": "POITransactionID",
        "type": "TransactionIdentification"
    },
    {
        "name": "ReuseCardDataFlag",
        "baseName": "ReuseCardDataFlag",
        "type": "boolean"
    },
    {
        "name": "SaleID",
        "baseName": "SaleID",
        "type": "string"
    }
];
//# sourceMappingURL=originalPOITransaction.js.map