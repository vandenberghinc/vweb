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
exports.OutputResult = void 0;
class OutputResult {
    static getAttributeTypeMap() {
        return OutputResult.attributeTypeMap;
    }
}
exports.OutputResult = OutputResult;
OutputResult.discriminator = undefined;
OutputResult.attributeTypeMap = [
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
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=outputResult.js.map