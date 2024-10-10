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
exports.Input = void 0;
class Input {
    static getAttributeTypeMap() {
        return Input.attributeTypeMap;
    }
}
exports.Input = Input;
Input.discriminator = undefined;
Input.attributeTypeMap = [
    {
        "name": "ConfirmedFlag",
        "baseName": "ConfirmedFlag",
        "type": "boolean"
    },
    {
        "name": "DigitInput",
        "baseName": "DigitInput",
        "type": "string"
    },
    {
        "name": "FunctionKey",
        "baseName": "FunctionKey",
        "type": "string"
    },
    {
        "name": "InputCommand",
        "baseName": "InputCommand",
        "type": "InputCommandType"
    },
    {
        "name": "MenuEntryNumber",
        "baseName": "MenuEntryNumber",
        "type": "number"
    },
    {
        "name": "Password",
        "baseName": "Password",
        "type": "ContentInformation"
    },
    {
        "name": "TextInput",
        "baseName": "TextInput",
        "type": "string"
    }
];
//# sourceMappingURL=input.js.map