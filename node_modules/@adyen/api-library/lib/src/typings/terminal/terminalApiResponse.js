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
 * Copyright (c) 2022 Adyen N.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalApiResponse = void 0;
class TerminalApiResponse {
    static getAttributeTypeMap() {
        return TerminalApiResponse.attributeTypeMap;
    }
}
exports.TerminalApiResponse = TerminalApiResponse;
TerminalApiResponse.discriminator = undefined;
TerminalApiResponse.attributeTypeMap = [
    {
        "name": "SaleToPOIResponse",
        "baseName": "SaleToPOIResponse",
        "type": "SaleToPOIResponse"
    },
    {
        "name": "SaleToPOIRequest",
        "baseName": "SaleToPOIRequest",
        "type": "SaleToPOIRequest"
    }
];
//# sourceMappingURL=terminalApiResponse.js.map