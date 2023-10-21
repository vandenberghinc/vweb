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
exports.InputUpdate = void 0;
class InputUpdate {
    static getAttributeTypeMap() {
        return InputUpdate.attributeTypeMap;
    }
}
exports.InputUpdate = InputUpdate;
InputUpdate.discriminator = undefined;
InputUpdate.attributeTypeMap = [
    {
        "name": "MaxDecimalLength",
        "baseName": "MaxDecimalLength",
        "type": "number"
    },
    {
        "name": "MaxLength",
        "baseName": "MaxLength",
        "type": "number"
    },
    {
        "name": "MenuEntry",
        "baseName": "MenuEntry",
        "type": "Array<MenuEntry>"
    },
    {
        "name": "MessageReference",
        "baseName": "MessageReference",
        "type": "MessageReference"
    },
    {
        "name": "MinLength",
        "baseName": "MinLength",
        "type": "number"
    },
    {
        "name": "OutputContent",
        "baseName": "OutputContent",
        "type": "OutputContent"
    },
    {
        "name": "OutputSignature",
        "baseName": "OutputSignature",
        "type": "any"
    }
];
//# sourceMappingURL=inputUpdate.js.map