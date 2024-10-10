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
exports.CapturedSignature = void 0;
class CapturedSignature {
    static getAttributeTypeMap() {
        return CapturedSignature.attributeTypeMap;
    }
}
exports.CapturedSignature = CapturedSignature;
CapturedSignature.discriminator = undefined;
CapturedSignature.attributeTypeMap = [
    {
        "name": "AreaSize",
        "baseName": "AreaSize",
        "type": "AreaSize"
    },
    {
        "name": "SignaturePoint",
        "baseName": "SignaturePoint",
        "type": "Array<SignaturePoint>"
    }
];
//# sourceMappingURL=capturedSignature.js.map