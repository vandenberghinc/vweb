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
exports.PaymentInstrumentData = void 0;
class PaymentInstrumentData {
    static getAttributeTypeMap() {
        return PaymentInstrumentData.attributeTypeMap;
    }
}
exports.PaymentInstrumentData = PaymentInstrumentData;
PaymentInstrumentData.discriminator = undefined;
PaymentInstrumentData.attributeTypeMap = [
    {
        "name": "CardData",
        "baseName": "CardData",
        "type": "CardData"
    },
    {
        "name": "CheckData",
        "baseName": "CheckData",
        "type": "CheckData"
    },
    {
        "name": "MobileData",
        "baseName": "MobileData",
        "type": "MobileData"
    },
    {
        "name": "PaymentInstrumentType",
        "baseName": "PaymentInstrumentType",
        "type": "PaymentInstrumentType"
    }
];
//# sourceMappingURL=paymentInstrumentData.js.map