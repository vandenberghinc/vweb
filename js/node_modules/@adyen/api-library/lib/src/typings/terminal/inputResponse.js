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
exports.InputResponse = void 0;
class InputResponse {
    static getAttributeTypeMap() {
        return InputResponse.attributeTypeMap;
    }
}
exports.InputResponse = InputResponse;
InputResponse.discriminator = undefined;
InputResponse.attributeTypeMap = [
    {
        "name": "InputResult",
        "baseName": "InputResult",
        "type": "InputResult"
    },
    {
        "name": "OutputResult",
        "baseName": "OutputResult",
        "type": "OutputResult"
    }
];
//# sourceMappingURL=inputResponse.js.map