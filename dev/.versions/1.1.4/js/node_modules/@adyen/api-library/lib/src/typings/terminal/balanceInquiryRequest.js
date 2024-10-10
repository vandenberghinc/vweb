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
exports.BalanceInquiryRequest = void 0;
class BalanceInquiryRequest {
    static getAttributeTypeMap() {
        return BalanceInquiryRequest.attributeTypeMap;
    }
}
exports.BalanceInquiryRequest = BalanceInquiryRequest;
BalanceInquiryRequest.discriminator = undefined;
BalanceInquiryRequest.attributeTypeMap = [
    {
        "name": "LoyaltyAccountReq",
        "baseName": "LoyaltyAccountReq",
        "type": "LoyaltyAccountReq"
    },
    {
        "name": "PaymentAccountReq",
        "baseName": "PaymentAccountReq",
        "type": "PaymentAccountReq"
    }
];
//# sourceMappingURL=balanceInquiryRequest.js.map