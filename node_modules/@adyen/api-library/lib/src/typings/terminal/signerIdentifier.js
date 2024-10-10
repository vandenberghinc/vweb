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
exports.SignerIdentifier = void 0;
class SignerIdentifier {
    static getAttributeTypeMap() {
        return SignerIdentifier.attributeTypeMap;
    }
}
exports.SignerIdentifier = SignerIdentifier;
SignerIdentifier.discriminator = undefined;
SignerIdentifier.attributeTypeMap = [
    {
        "name": "IssuerAndSerialNumber",
        "baseName": "IssuerAndSerialNumber",
        "type": "IssuerAndSerialNumber"
    }
];
//# sourceMappingURL=signerIdentifier.js.map