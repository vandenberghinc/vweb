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
exports.PaymentToken = void 0;
class PaymentToken {
    static getAttributeTypeMap() {
        return PaymentToken.attributeTypeMap;
    }
}
exports.PaymentToken = PaymentToken;
PaymentToken.discriminator = undefined;
PaymentToken.attributeTypeMap = [
    {
        "name": "ExpiryDateTime",
        "baseName": "ExpiryDateTime",
        "type": "{ [key: string]: any; }"
    },
    {
        "name": "TokenRequestedType",
        "baseName": "TokenRequestedType",
        "type": "TokenRequestedType"
    },
    {
        "name": "TokenValue",
        "baseName": "TokenValue",
        "type": "string"
    }
];
//# sourceMappingURL=paymentToken.js.map