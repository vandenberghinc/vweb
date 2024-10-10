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
exports.PaymentResponse = void 0;
class PaymentResponse {
    static getAttributeTypeMap() {
        return PaymentResponse.attributeTypeMap;
    }
}
exports.PaymentResponse = PaymentResponse;
PaymentResponse.discriminator = undefined;
PaymentResponse.attributeTypeMap = [
    {
        "name": "CustomerOrder",
        "baseName": "CustomerOrder",
        "type": "Array<CustomerOrder>"
    },
    {
        "name": "LoyaltyResult",
        "baseName": "LoyaltyResult",
        "type": "Array<LoyaltyResult>"
    },
    {
        "name": "PaymentReceipt",
        "baseName": "PaymentReceipt",
        "type": "Array<PaymentReceipt>"
    },
    {
        "name": "PaymentResult",
        "baseName": "PaymentResult",
        "type": "PaymentResult"
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
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData"
    }
];
//# sourceMappingURL=paymentResponse.js.map