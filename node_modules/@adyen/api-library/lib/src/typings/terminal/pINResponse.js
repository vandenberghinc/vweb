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
exports.PINResponse = void 0;
class PINResponse {
    static getAttributeTypeMap() {
        return PINResponse.attributeTypeMap;
    }
}
exports.PINResponse = PINResponse;
PINResponse.discriminator = undefined;
PINResponse.attributeTypeMap = [
    {
        "name": "CardholderPIN",
        "baseName": "CardholderPIN",
        "type": "CardholderPIN"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=pINResponse.js.map