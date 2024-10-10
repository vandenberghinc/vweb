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
exports.PrintOutput = void 0;
class PrintOutput {
    static getAttributeTypeMap() {
        return PrintOutput.attributeTypeMap;
    }
}
exports.PrintOutput = PrintOutput;
PrintOutput.discriminator = undefined;
PrintOutput.attributeTypeMap = [
    {
        "name": "DocumentQualifier",
        "baseName": "DocumentQualifier",
        "type": "DocumentQualifierType"
    },
    {
        "name": "IntegratedPrintFlag",
        "baseName": "IntegratedPrintFlag",
        "type": "boolean"
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
        "name": "RequiredSignatureFlag",
        "baseName": "RequiredSignatureFlag",
        "type": "boolean"
    },
    {
        "name": "ResponseMode",
        "baseName": "ResponseMode",
        "type": "ResponseModeType"
    }
];
//# sourceMappingURL=printOutput.js.map