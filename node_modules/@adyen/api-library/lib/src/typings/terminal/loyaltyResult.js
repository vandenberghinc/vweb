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
exports.LoyaltyResult = void 0;
class LoyaltyResult {
    static getAttributeTypeMap() {
        return LoyaltyResult.attributeTypeMap;
    }
}
exports.LoyaltyResult = LoyaltyResult;
LoyaltyResult.discriminator = undefined;
LoyaltyResult.attributeTypeMap = [
    {
        "name": "CurrentBalance",
        "baseName": "CurrentBalance",
        "type": "number"
    },
    {
        "name": "LoyaltyAccount",
        "baseName": "LoyaltyAccount",
        "type": "LoyaltyAccount"
    },
    {
        "name": "LoyaltyAcquirerData",
        "baseName": "LoyaltyAcquirerData",
        "type": "LoyaltyAcquirerData"
    },
    {
        "name": "LoyaltyAmount",
        "baseName": "LoyaltyAmount",
        "type": "LoyaltyAmount"
    },
    {
        "name": "Rebates",
        "baseName": "Rebates",
        "type": "Rebates"
    }
];
//# sourceMappingURL=loyaltyResult.js.map