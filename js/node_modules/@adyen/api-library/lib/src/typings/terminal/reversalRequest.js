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
exports.ReversalRequest = void 0;
class ReversalRequest {
    static getAttributeTypeMap() {
        return ReversalRequest.attributeTypeMap;
    }
}
exports.ReversalRequest = ReversalRequest;
ReversalRequest.discriminator = undefined;
ReversalRequest.attributeTypeMap = [
    {
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData",
    },
    {
        "name": "OriginalPOITransaction",
        "baseName": "OriginalPOITransaction",
        "type": "OriginalPOITransaction"
    },
    {
        "name": "ReversalReason",
        "baseName": "ReversalReason",
        "type": "ReversalReasonType"
    },
    {
        "name": "ReversedAmount",
        "baseName": "ReversedAmount",
        "type": "number"
    },
    {
        "name": "CustomerOrder",
        "baseName": "CustomerOrder",
        "type": "CustomerOrder"
    }
];
//# sourceMappingURL=reversalRequest.js.map