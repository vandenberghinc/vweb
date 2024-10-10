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
exports.CashHandlingDevice = void 0;
class CashHandlingDevice {
    static getAttributeTypeMap() {
        return CashHandlingDevice.attributeTypeMap;
    }
}
exports.CashHandlingDevice = CashHandlingDevice;
CashHandlingDevice.discriminator = undefined;
CashHandlingDevice.attributeTypeMap = [
    {
        "name": "CashHandlingOkFlag",
        "baseName": "CashHandlingOkFlag",
        "type": "boolean"
    },
    {
        "name": "CoinsOrBills",
        "baseName": "CoinsOrBills",
        "type": "Array<CoinsOrBills>"
    },
    {
        "name": "Currency",
        "baseName": "Currency",
        "type": "string"
    }
];
//# sourceMappingURL=cashHandlingDevice.js.map