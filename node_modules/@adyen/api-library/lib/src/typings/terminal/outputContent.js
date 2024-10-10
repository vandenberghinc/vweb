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
exports.OutputContent = void 0;
class OutputContent {
    static getAttributeTypeMap() {
        return OutputContent.attributeTypeMap;
    }
}
exports.OutputContent = OutputContent;
OutputContent.discriminator = undefined;
OutputContent.attributeTypeMap = [
    {
        "name": "OutputBarcode",
        "baseName": "OutputBarcode",
        "type": "OutputBarcode"
    },
    {
        "name": "OutputFormat",
        "baseName": "OutputFormat",
        "type": "OutputFormatType"
    },
    {
        "name": "OutputText",
        "baseName": "OutputText",
        "type": "Array<OutputText>"
    },
    {
        "name": "OutputXHTML",
        "baseName": "OutputXHTML",
        "type": "any"
    },
    {
        "name": "PredefinedContent",
        "baseName": "PredefinedContent",
        "type": "PredefinedContent"
    }
];
//# sourceMappingURL=outputContent.js.map