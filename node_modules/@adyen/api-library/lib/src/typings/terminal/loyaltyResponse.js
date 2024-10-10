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
exports.LoyaltyResponse = void 0;
class LoyaltyResponse {
    static getAttributeTypeMap() {
        return LoyaltyResponse.attributeTypeMap;
    }
}
exports.LoyaltyResponse = LoyaltyResponse;
LoyaltyResponse.discriminator = undefined;
LoyaltyResponse.attributeTypeMap = [
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
//# sourceMappingURL=loyaltyResponse.js.map