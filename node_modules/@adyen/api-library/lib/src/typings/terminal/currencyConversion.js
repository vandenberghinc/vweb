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
exports.CurrencyConversion = void 0;
class CurrencyConversion {
    static getAttributeTypeMap() {
        return CurrencyConversion.attributeTypeMap;
    }
}
exports.CurrencyConversion = CurrencyConversion;
CurrencyConversion.discriminator = undefined;
CurrencyConversion.attributeTypeMap = [
    {
        "name": "Commission",
        "baseName": "Commission",
        "type": "number"
    },
    {
        "name": "ConvertedAmount",
        "baseName": "ConvertedAmount",
        "type": "Amount"
    },
    {
        "name": "CustomerApprovedFlag",
        "baseName": "CustomerApprovedFlag",
        "type": "boolean"
    },
    {
        "name": "Declaration",
        "baseName": "Declaration",
        "type": "string"
    },
    {
        "name": "Markup",
        "baseName": "Markup",
        "type": "number"
    },
    {
        "name": "Rate",
        "baseName": "Rate",
        "type": "number"
    }
];
//# sourceMappingURL=currencyConversion.js.map