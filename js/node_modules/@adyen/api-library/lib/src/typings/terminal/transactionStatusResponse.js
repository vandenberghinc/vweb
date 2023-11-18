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
exports.TransactionStatusResponse = void 0;
class TransactionStatusResponse {
    static getAttributeTypeMap() {
        return TransactionStatusResponse.attributeTypeMap;
    }
}
exports.TransactionStatusResponse = TransactionStatusResponse;
TransactionStatusResponse.discriminator = undefined;
TransactionStatusResponse.attributeTypeMap = [
    {
        "name": "MessageReference",
        "baseName": "MessageReference",
        "type": "MessageReference"
    },
    {
        "name": "RepeatedMessageResponse",
        "baseName": "RepeatedMessageResponse",
        "type": "RepeatedMessageResponse"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=transactionStatusResponse.js.map