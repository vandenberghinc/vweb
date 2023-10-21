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
exports.Issuer = void 0;
class Issuer {
    static getAttributeTypeMap() {
        return Issuer.attributeTypeMap;
    }
}
exports.Issuer = Issuer;
Issuer.discriminator = undefined;
Issuer.attributeTypeMap = [
    {
        "name": "RelativeDistinguishedName",
        "baseName": "RelativeDistinguishedName",
        "type": "Array<RelativeDistinguishedName>"
    }
];
//# sourceMappingURL=issuer.js.map