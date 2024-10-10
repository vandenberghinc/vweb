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
exports.BalanceInquiryResponse = void 0;
class BalanceInquiryResponse {
    static getAttributeTypeMap() {
        return BalanceInquiryResponse.attributeTypeMap;
    }
}
exports.BalanceInquiryResponse = BalanceInquiryResponse;
BalanceInquiryResponse.discriminator = undefined;
BalanceInquiryResponse.attributeTypeMap = [
    {
        "name": "LoyaltyAccountStatus",
        "baseName": "LoyaltyAccountStatus",
        "type": "LoyaltyAccountStatus"
    },
    {
        "name": "PaymentAccountStatus",
        "baseName": "PaymentAccountStatus",
        "type": "PaymentAccountStatus"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=balanceInquiryResponse.js.map