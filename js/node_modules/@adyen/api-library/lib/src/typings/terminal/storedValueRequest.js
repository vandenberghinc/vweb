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
exports.StoredValueRequest = void 0;
class StoredValueRequest {
    static getAttributeTypeMap() {
        return StoredValueRequest.attributeTypeMap;
    }
}
exports.StoredValueRequest = StoredValueRequest;
StoredValueRequest.discriminator = undefined;
StoredValueRequest.attributeTypeMap = [
    {
        "name": "CustomerLanguage",
        "baseName": "CustomerLanguage",
        "type": "string"
    },
    {
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData"
    },
    {
        "name": "StoredValueData",
        "baseName": "StoredValueData",
        "type": "Array<StoredValueData>"
    }
];
//# sourceMappingURL=storedValueRequest.js.map