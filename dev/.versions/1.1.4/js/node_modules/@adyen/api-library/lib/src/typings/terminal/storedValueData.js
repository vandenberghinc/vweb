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
exports.StoredValueData = void 0;
class StoredValueData {
    static getAttributeTypeMap() {
        return StoredValueData.attributeTypeMap;
    }
}
exports.StoredValueData = StoredValueData;
StoredValueData.discriminator = undefined;
StoredValueData.attributeTypeMap = [
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
        "name": "ItemAmount",
        "baseName": "ItemAmount",
        "type": "number"
    },
    {
        "name": "OriginalPOITransaction",
        "baseName": "OriginalPOITransaction",
        "type": "OriginalPOITransaction"
    },
    {
        "name": "ProductCode",
        "baseName": "ProductCode",
        "type": "string"
    },
    {
        "name": "StoredValueAccountID",
        "baseName": "StoredValueAccountID",
        "type": "StoredValueAccountId"
    },
    {
        "name": "StoredValueProvider",
        "baseName": "StoredValueProvider",
        "type": "string"
    },
    {
        "name": "StoredValueTransactionType",
        "baseName": "StoredValueTransactionType",
        "type": "StoredValueTransactionType"
    }
];
//# sourceMappingURL=storedValueData.js.map