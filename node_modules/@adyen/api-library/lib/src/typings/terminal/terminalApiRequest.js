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
exports.TerminalApiRequest = void 0;
class TerminalApiRequest {
    static getAttributeTypeMap() {
        return TerminalApiRequest.attributeTypeMap;
    }
}
exports.TerminalApiRequest = TerminalApiRequest;
TerminalApiRequest.discriminator = undefined;
TerminalApiRequest.attributeTypeMap = [
    {
        "name": "SaleToPOIRequest",
        "baseName": "SaleToPOIRequest",
        "type": "SaleToPOIRequest"
    }
];
//# sourceMappingURL=terminalApiRequest.js.map