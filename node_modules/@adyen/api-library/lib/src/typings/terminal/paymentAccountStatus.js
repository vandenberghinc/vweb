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
exports.PaymentAccountStatus = void 0;
class PaymentAccountStatus {
    static getAttributeTypeMap() {
        return PaymentAccountStatus.attributeTypeMap;
    }
}
exports.PaymentAccountStatus = PaymentAccountStatus;
PaymentAccountStatus.discriminator = undefined;
PaymentAccountStatus.attributeTypeMap = [
    {
        "name": "Currency",
        "baseName": "Currency",
        "type": "string"
    },
    {
        "name": "CurrentBalance",
        "baseName": "CurrentBalance",
        "type": "number"
    },
    {
        "name": "LoyaltyAccountStatus",
        "baseName": "LoyaltyAccountStatus",
        "type": "LoyaltyAccountStatus"
    },
    {
        "name": "PaymentAcquirerData",
        "baseName": "PaymentAcquirerData",
        "type": "PaymentAcquirerData"
    },
    {
        "name": "PaymentInstrumentData",
        "baseName": "PaymentInstrumentData",
        "type": "PaymentInstrumentData"
    }
];
//# sourceMappingURL=paymentAccountStatus.js.map