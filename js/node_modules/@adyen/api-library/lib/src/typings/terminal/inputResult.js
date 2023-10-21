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
exports.InputResult = void 0;
class InputResult {
    static getAttributeTypeMap() {
        return InputResult.attributeTypeMap;
    }
}
exports.InputResult = InputResult;
InputResult.discriminator = undefined;
InputResult.attributeTypeMap = [
    {
        "name": "Device",
        "baseName": "Device",
        "type": "DeviceType"
    },
    {
        "name": "InfoQualify",
        "baseName": "InfoQualify",
        "type": "InfoQualifyType"
    },
    {
        "name": "Input",
        "baseName": "Input",
        "type": "Input"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=inputResult.js.map