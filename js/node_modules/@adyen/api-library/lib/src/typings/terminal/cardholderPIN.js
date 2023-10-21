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
exports.CardholderPIN = void 0;
class CardholderPIN {
    static getAttributeTypeMap() {
        return CardholderPIN.attributeTypeMap;
    }
}
exports.CardholderPIN = CardholderPIN;
CardholderPIN.discriminator = undefined;
CardholderPIN.attributeTypeMap = [
    {
        "name": "AdditionalInput",
        "baseName": "AdditionalInput",
        "type": "string"
    },
    {
        "name": "EncrPINBlock",
        "baseName": "EncrPINBlock",
        "type": "ContentInformation"
    },
    {
        "name": "PINFormat",
        "baseName": "PINFormat",
        "type": "PINFormatType"
    }
];
//# sourceMappingURL=cardholderPIN.js.map