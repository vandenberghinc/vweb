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
exports.InputData = void 0;
class InputData {
    static getAttributeTypeMap() {
        return InputData.attributeTypeMap;
    }
}
exports.InputData = InputData;
InputData.discriminator = undefined;
InputData.attributeTypeMap = [
    {
        "name": "BeepKeyFlag",
        "baseName": "BeepKeyFlag",
        "type": "boolean"
    },
    {
        "name": "DefaultInputString",
        "baseName": "DefaultInputString",
        "type": "string"
    },
    {
        "name": "Device",
        "baseName": "Device",
        "type": "DeviceType"
    },
    {
        "name": "DisableCancelFlag",
        "baseName": "DisableCancelFlag",
        "type": "boolean"
    },
    {
        "name": "DisableCorrectFlag",
        "baseName": "DisableCorrectFlag",
        "type": "boolean"
    },
    {
        "name": "DisableValidFlag",
        "baseName": "DisableValidFlag",
        "type": "boolean"
    },
    {
        "name": "FromRightToLeftFlag",
        "baseName": "FromRightToLeftFlag",
        "type": "boolean"
    },
    {
        "name": "GlobalCorrectionFlag",
        "baseName": "GlobalCorrectionFlag",
        "type": "boolean"
    },
    {
        "name": "ImmediateResponseFlag",
        "baseName": "ImmediateResponseFlag",
        "type": "boolean"
    },
    {
        "name": "InfoQualify",
        "baseName": "InfoQualify",
        "type": "InfoQualifyType"
    },
    {
        "name": "InputCommand",
        "baseName": "InputCommand",
        "type": "InputCommandType"
    },
    {
        "name": "MaskCharactersFlag",
        "baseName": "MaskCharactersFlag",
        "type": "boolean"
    },
    {
        "name": "MaxDecimalLength",
        "baseName": "MaxDecimalLength",
        "type": "number"
    },
    {
        "name": "MaxInputTime",
        "baseName": "MaxInputTime",
        "type": "number"
    },
    {
        "name": "MaxLength",
        "baseName": "MaxLength",
        "type": "number"
    },
    {
        "name": "MenuBackFlag",
        "baseName": "MenuBackFlag",
        "type": "boolean"
    },
    {
        "name": "MinLength",
        "baseName": "MinLength",
        "type": "number"
    },
    {
        "name": "NotifyCardInputFlag",
        "baseName": "NotifyCardInputFlag",
        "type": "boolean"
    },
    {
        "name": "StringMask",
        "baseName": "StringMask",
        "type": "string"
    },
    {
        "name": "WaitUserValidationFlag",
        "baseName": "WaitUserValidationFlag",
        "type": "boolean"
    }
];
//# sourceMappingURL=inputData.js.map