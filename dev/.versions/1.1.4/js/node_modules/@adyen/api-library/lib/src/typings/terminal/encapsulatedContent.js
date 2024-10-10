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
exports.EncapsulatedContent = void 0;
class EncapsulatedContent {
    static getAttributeTypeMap() {
        return EncapsulatedContent.attributeTypeMap;
    }
}
exports.EncapsulatedContent = EncapsulatedContent;
EncapsulatedContent.discriminator = undefined;
EncapsulatedContent.attributeTypeMap = [
    {
        "name": "Content",
        "baseName": "Content",
        "type": "any"
    },
    {
        "name": "ContentType",
        "baseName": "ContentType",
        "type": "ContentType"
    }
];
//# sourceMappingURL=encapsulatedContent.js.map