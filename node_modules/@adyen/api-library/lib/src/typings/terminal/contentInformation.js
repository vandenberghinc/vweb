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
exports.ContentInformation = void 0;
class ContentInformation {
    static getAttributeTypeMap() {
        return ContentInformation.attributeTypeMap;
    }
}
exports.ContentInformation = ContentInformation;
ContentInformation.discriminator = undefined;
ContentInformation.attributeTypeMap = [
    {
        "name": "AuthenticatedData",
        "baseName": "AuthenticatedData",
        "type": "AuthenticatedData"
    },
    {
        "name": "ContentType",
        "baseName": "ContentType",
        "type": "ContentType"
    },
    {
        "name": "DigestedData",
        "baseName": "DigestedData",
        "type": "DigestedData"
    },
    {
        "name": "EnvelopedData",
        "baseName": "EnvelopedData",
        "type": "EnvelopedData"
    },
    {
        "name": "NamedKeyEncryptedData",
        "baseName": "NamedKeyEncryptedData",
        "type": "NamedKeyEncryptedData"
    },
    {
        "name": "SignedData",
        "baseName": "SignedData",
        "type": "SignedData"
    }
];
//# sourceMappingURL=contentInformation.js.map