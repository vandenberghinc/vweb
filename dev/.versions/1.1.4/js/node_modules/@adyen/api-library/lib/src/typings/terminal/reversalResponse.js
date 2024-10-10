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
exports.ReversalResponse = void 0;
class ReversalResponse {
    static getAttributeTypeMap() {
        return ReversalResponse.attributeTypeMap;
    }
}
exports.ReversalResponse = ReversalResponse;
ReversalResponse.discriminator = undefined;
ReversalResponse.attributeTypeMap = [
    {
        "name": "CustomerOrderID",
        "baseName": "CustomerOrderID",
        "type": "string"
    },
    {
        "name": "OriginalPOITransaction",
        "baseName": "OriginalPOITransaction",
        "type": "OriginalPOITransaction"
    },
    {
        "name": "PaymentReceipt",
        "baseName": "PaymentReceipt",
        "type": "Array<PaymentReceipt>"
    },
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
        "name": "ReversedAmount",
        "baseName": "ReversedAmount",
        "type": "number"
    }
];
//# sourceMappingURL=reversalResponse.js.map