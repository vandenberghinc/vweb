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
exports.NamedKeyEncryptedData = void 0;
class NamedKeyEncryptedData {
    static getAttributeTypeMap() {
        return NamedKeyEncryptedData.attributeTypeMap;
    }
}
exports.NamedKeyEncryptedData = NamedKeyEncryptedData;
NamedKeyEncryptedData.discriminator = undefined;
NamedKeyEncryptedData.attributeTypeMap = [
    {
        "name": "EncryptedContent",
        "baseName": "EncryptedContent",
        "type": "EncryptedContent"
    },
    {
        "name": "KeyName",
        "baseName": "KeyName",
        "type": "string"
    },
    {
        "name": "Version",
        "baseName": "Version",
        "type": "NamedKeyEncryptedData.VersionEnum"
    }
];
(function (NamedKeyEncryptedData) {
    let VersionEnum;
    (function (VersionEnum) {
        VersionEnum[VersionEnum["V0"] = 'V0'] = "V0";
        VersionEnum[VersionEnum["V1"] = 'V1'] = "V1";
        VersionEnum[VersionEnum["V2"] = 'V2'] = "V2";
        VersionEnum[VersionEnum["V3"] = 'V3'] = "V3";
        VersionEnum[VersionEnum["V4"] = 'V4'] = "V4";
        VersionEnum[VersionEnum["V5"] = 'V5'] = "V5";
    })(VersionEnum = NamedKeyEncryptedData.VersionEnum || (NamedKeyEncryptedData.VersionEnum = {}));
})(NamedKeyEncryptedData = exports.NamedKeyEncryptedData || (exports.NamedKeyEncryptedData = {}));
//# sourceMappingURL=namedKeyEncryptedData.js.map