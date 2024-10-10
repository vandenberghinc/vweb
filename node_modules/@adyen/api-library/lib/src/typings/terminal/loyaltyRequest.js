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
exports.LoyaltyRequest = void 0;
class LoyaltyRequest {
    static getAttributeTypeMap() {
        return LoyaltyRequest.attributeTypeMap;
    }
}
exports.LoyaltyRequest = LoyaltyRequest;
LoyaltyRequest.discriminator = undefined;
LoyaltyRequest.attributeTypeMap = [
    {
        "name": "LoyaltyData",
        "baseName": "LoyaltyData",
        "type": "Array<LoyaltyData>"
    },
    {
        "name": "LoyaltyTransaction",
        "baseName": "LoyaltyTransaction",
        "type": "LoyaltyTransaction"
    },
    {
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData"
    }
];
//# sourceMappingURL=loyaltyRequest.js.map