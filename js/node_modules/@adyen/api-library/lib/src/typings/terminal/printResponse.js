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
exports.PrintResponse = void 0;
class PrintResponse {
    static getAttributeTypeMap() {
        return PrintResponse.attributeTypeMap;
    }
}
exports.PrintResponse = PrintResponse;
PrintResponse.discriminator = undefined;
PrintResponse.attributeTypeMap = [
    {
        "name": "DocumentQualifier",
        "baseName": "DocumentQualifier",
        "type": "DocumentQualifierType"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=printResponse.js.map