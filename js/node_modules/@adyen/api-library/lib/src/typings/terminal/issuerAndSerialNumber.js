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
exports.IssuerAndSerialNumber = void 0;
class IssuerAndSerialNumber {
    static getAttributeTypeMap() {
        return IssuerAndSerialNumber.attributeTypeMap;
    }
}
exports.IssuerAndSerialNumber = IssuerAndSerialNumber;
IssuerAndSerialNumber.discriminator = undefined;
IssuerAndSerialNumber.attributeTypeMap = [
    {
        "name": "Issuer",
        "baseName": "Issuer",
        "type": "Issuer"
    },
    {
        "name": "SerialNumber",
        "baseName": "SerialNumber",
        "type": "number"
    }
];
//# sourceMappingURL=issuerAndSerialNumber.js.map