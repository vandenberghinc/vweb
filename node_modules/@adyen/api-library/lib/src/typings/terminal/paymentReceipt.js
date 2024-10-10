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
exports.PaymentReceipt = void 0;
class PaymentReceipt {
    static getAttributeTypeMap() {
        return PaymentReceipt.attributeTypeMap;
    }
}
exports.PaymentReceipt = PaymentReceipt;
PaymentReceipt.discriminator = undefined;
PaymentReceipt.attributeTypeMap = [
    {
        "name": "DocumentQualifier",
        "baseName": "DocumentQualifier",
        "type": "DocumentQualifierType"
    },
    {
        "name": "IntegratedPrintFlag",
        "baseName": "IntegratedPrintFlag",
        "type": "boolean"
    },
    {
        "name": "OutputContent",
        "baseName": "OutputContent",
        "type": "OutputContent"
    },
    {
        "name": "RequiredSignatureFlag",
        "baseName": "RequiredSignatureFlag",
        "type": "boolean"
    }
];
//# sourceMappingURL=paymentReceipt.js.map