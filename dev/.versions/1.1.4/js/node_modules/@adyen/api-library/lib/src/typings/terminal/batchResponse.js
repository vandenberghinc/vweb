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
exports.BatchResponse = void 0;
class BatchResponse {
    static getAttributeTypeMap() {
        return BatchResponse.attributeTypeMap;
    }
}
exports.BatchResponse = BatchResponse;
BatchResponse.discriminator = undefined;
BatchResponse.attributeTypeMap = [
    {
        "name": "PerformedTransaction",
        "baseName": "PerformedTransaction",
        "type": "Array<PerformedTransaction>"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=batchResponse.js.map