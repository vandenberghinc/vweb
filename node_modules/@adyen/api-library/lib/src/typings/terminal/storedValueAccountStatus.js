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
exports.StoredValueAccountStatus = void 0;
class StoredValueAccountStatus {
    static getAttributeTypeMap() {
        return StoredValueAccountStatus.attributeTypeMap;
    }
}
exports.StoredValueAccountStatus = StoredValueAccountStatus;
StoredValueAccountStatus.discriminator = undefined;
StoredValueAccountStatus.attributeTypeMap = [
    {
        "name": "CurrentBalance",
        "baseName": "CurrentBalance",
        "type": "number"
    },
    {
        "name": "StoredValueAccountID",
        "baseName": "StoredValueAccountID",
        "type": "StoredValueAccountId"
    }
];
//# sourceMappingURL=storedValueAccountStatus.js.map