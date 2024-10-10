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
exports.StoredValueResponse = void 0;
class StoredValueResponse {
    static getAttributeTypeMap() {
        return StoredValueResponse.attributeTypeMap;
    }
}
exports.StoredValueResponse = StoredValueResponse;
StoredValueResponse.discriminator = undefined;
StoredValueResponse.attributeTypeMap = [
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
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData"
    },
    {
        "name": "StoredValueResult",
        "baseName": "StoredValueResult",
        "type": "Array<StoredValueResult>"
    }
];
//# sourceMappingURL=storedValueResponse.js.map