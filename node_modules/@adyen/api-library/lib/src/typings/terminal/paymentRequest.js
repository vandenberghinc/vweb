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
exports.PaymentRequest = void 0;
class PaymentRequest {
    static getAttributeTypeMap() {
        return PaymentRequest.attributeTypeMap;
    }
}
exports.PaymentRequest = PaymentRequest;
PaymentRequest.discriminator = undefined;
PaymentRequest.attributeTypeMap = [
    {
        "name": "LoyaltyData",
        "baseName": "LoyaltyData",
        "type": "Array<LoyaltyData>"
    },
    {
        "name": "PaymentData",
        "baseName": "PaymentData",
        "type": "PaymentData"
    },
    {
        "name": "PaymentTransaction",
        "baseName": "PaymentTransaction",
        "type": "PaymentTransaction"
    },
    {
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData"
    }
];
//# sourceMappingURL=paymentRequest.js.map