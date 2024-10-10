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
exports.DisplayOutput = void 0;
class DisplayOutput {
    static getAttributeTypeMap() {
        return DisplayOutput.attributeTypeMap;
    }
}
exports.DisplayOutput = DisplayOutput;
DisplayOutput.discriminator = undefined;
DisplayOutput.attributeTypeMap = [
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
        "name": "MenuEntry",
        "baseName": "MenuEntry",
        "type": "Array<MenuEntry>"
    },
    {
        "name": "MinimumDisplayTime",
        "baseName": "MinimumDisplayTime",
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
    },
    {
        "name": "ResponseRequiredFlag",
        "baseName": "ResponseRequiredFlag",
        "type": "boolean"
    }
];
//# sourceMappingURL=displayOutput.js.map