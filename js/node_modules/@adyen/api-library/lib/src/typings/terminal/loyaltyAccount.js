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
exports.LoyaltyAccount = void 0;
class LoyaltyAccount {
    static getAttributeTypeMap() {
        return LoyaltyAccount.attributeTypeMap;
    }
}
exports.LoyaltyAccount = LoyaltyAccount;
LoyaltyAccount.discriminator = undefined;
LoyaltyAccount.attributeTypeMap = [
    {
        "name": "LoyaltyAccountID",
        "baseName": "LoyaltyAccountID",
        "type": "LoyaltyAccountId"
    },
    {
        "name": "LoyaltyBrand",
        "baseName": "LoyaltyBrand",
        "type": "string"
    }
];
//# sourceMappingURL=loyaltyAccount.js.map