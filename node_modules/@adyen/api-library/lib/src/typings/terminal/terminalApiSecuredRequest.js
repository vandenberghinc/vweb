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
exports.TerminalApiSecuredRequest = void 0;
class TerminalApiSecuredRequest {
    static getAttributeTypeMap() {
        return TerminalApiSecuredRequest.attributeTypeMap;
    }
}
exports.TerminalApiSecuredRequest = TerminalApiSecuredRequest;
TerminalApiSecuredRequest.discriminator = undefined;
TerminalApiSecuredRequest.attributeTypeMap = [
    {
        "name": "SaleToPOIRequest",
        "baseName": "SaleToPOIRequest",
        "type": "SaleToPOISecuredMessage"
    }
];
//# sourceMappingURL=terminalApiSecuredRequest.js.map