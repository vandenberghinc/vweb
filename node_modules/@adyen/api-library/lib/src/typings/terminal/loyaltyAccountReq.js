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
exports.LoyaltyAccountReq = void 0;
class LoyaltyAccountReq {
    static getAttributeTypeMap() {
        return LoyaltyAccountReq.attributeTypeMap;
    }
}
exports.LoyaltyAccountReq = LoyaltyAccountReq;
LoyaltyAccountReq.discriminator = undefined;
LoyaltyAccountReq.attributeTypeMap = [
    {
        "name": "CardAcquisitionReference",
        "baseName": "CardAcquisitionReference",
        "type": "TransactionIdentification"
    },
    {
        "name": "LoyaltyAccountID",
        "baseName": "LoyaltyAccountID",
        "type": "LoyaltyAccountId"
    }
];
//# sourceMappingURL=loyaltyAccountReq.js.map