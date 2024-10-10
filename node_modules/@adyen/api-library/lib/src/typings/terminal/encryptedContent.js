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
exports.EncryptedContent = void 0;
class EncryptedContent {
    static getAttributeTypeMap() {
        return EncryptedContent.attributeTypeMap;
    }
}
exports.EncryptedContent = EncryptedContent;
EncryptedContent.discriminator = undefined;
EncryptedContent.attributeTypeMap = [
    {
        "name": "ContentEncryptionAlgorithm",
        "baseName": "ContentEncryptionAlgorithm",
        "type": "AlgorithmIdentifier"
    },
    {
        "name": "ContentType",
        "baseName": "ContentType",
        "type": "ContentType"
    },
    {
        "name": "EncryptedData",
        "baseName": "EncryptedData",
        "type": "any"
    }
];
//# sourceMappingURL=encryptedContent.js.map