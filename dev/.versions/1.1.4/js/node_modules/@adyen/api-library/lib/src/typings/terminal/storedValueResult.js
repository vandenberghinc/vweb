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
exports.StoredValueResult = void 0;
class StoredValueResult {
    static getAttributeTypeMap() {
        return StoredValueResult.attributeTypeMap;
    }
}
exports.StoredValueResult = StoredValueResult;
StoredValueResult.discriminator = undefined;
StoredValueResult.attributeTypeMap = [
    {
        "name": "Currency",
        "baseName": "Currency",
        "type": "string"
    },
    {
        "name": "EanUpc",
        "baseName": "EanUpc",
        "type": "string"
    },
    {
        "name": "HostTransactionID",
        "baseName": "HostTransactionID",
        "type": "TransactionIdentification"
    },
    {
        "name": "ItemAmount",
        "baseName": "ItemAmount",
        "type": "number"
    },
    {
        "name": "ProductCode",
        "baseName": "ProductCode",
        "type": "string"
    },
    {
        "name": "StoredValueAccountStatus",
        "baseName": "StoredValueAccountStatus",
        "type": "StoredValueAccountStatus"
    },
    {
        "name": "StoredValueTransactionType",
        "baseName": "StoredValueTransactionType",
        "type": "StoredValueTransactionType"
    }
];
//# sourceMappingURL=storedValueResult.js.map