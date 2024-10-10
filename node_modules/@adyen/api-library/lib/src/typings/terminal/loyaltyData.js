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
exports.LoyaltyData = void 0;
class LoyaltyData {
    static getAttributeTypeMap() {
        return LoyaltyData.attributeTypeMap;
    }
}
exports.LoyaltyData = LoyaltyData;
LoyaltyData.discriminator = undefined;
LoyaltyData.attributeTypeMap = [
    {
        "name": "CardAcquisitionReference",
        "baseName": "CardAcquisitionReference",
        "type": "TransactionIdentification"
    },
    {
        "name": "LoyaltyAccountID",
        "baseName": "LoyaltyAccountID",
        "type": "LoyaltyAccountId"
    },
    {
        "name": "LoyaltyAmount",
        "baseName": "LoyaltyAmount",
        "type": "LoyaltyAmount"
    }
];
//# sourceMappingURL=loyaltyData.js.map