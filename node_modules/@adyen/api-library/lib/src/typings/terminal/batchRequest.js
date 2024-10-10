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
exports.BatchRequest = void 0;
class BatchRequest {
    static getAttributeTypeMap() {
        return BatchRequest.attributeTypeMap;
    }
}
exports.BatchRequest = BatchRequest;
BatchRequest.discriminator = undefined;
BatchRequest.attributeTypeMap = [
    {
        "name": "RemoveAllFlag",
        "baseName": "RemoveAllFlag",
        "type": "boolean"
    },
    {
        "name": "TransactionToPerform",
        "baseName": "TransactionToPerform",
        "type": "Array<TransactionToPerform>"
    }
];
//# sourceMappingURL=batchRequest.js.map