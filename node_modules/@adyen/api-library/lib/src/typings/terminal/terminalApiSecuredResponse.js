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
exports.TerminalApiSecuredResponse = void 0;
class TerminalApiSecuredResponse {
    static getAttributeTypeMap() {
        return TerminalApiSecuredResponse.attributeTypeMap;
    }
}
exports.TerminalApiSecuredResponse = TerminalApiSecuredResponse;
TerminalApiSecuredResponse.discriminator = undefined;
TerminalApiSecuredResponse.attributeTypeMap = [
    {
        "name": "SaleToPOIResponse",
        "baseName": "SaleToPOIResponse",
        "type": "SaleToPOISecuredMessage"
    }
];
//# sourceMappingURL=terminalApiSecuredResponse.js.map