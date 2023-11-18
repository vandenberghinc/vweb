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
exports.EnvelopedData = void 0;
class EnvelopedData {
    static getAttributeTypeMap() {
        return EnvelopedData.attributeTypeMap;
    }
}
exports.EnvelopedData = EnvelopedData;
EnvelopedData.discriminator = undefined;
EnvelopedData.attributeTypeMap = [
    {
        "name": "EncryptedContent",
        "baseName": "EncryptedContent",
        "type": "EncryptedContent"
    },
    {
        "name": "KeyTransportOrKEK",
        "baseName": "KeyTransportOrKEK",
        "type": "Array<any>"
    },
    {
        "name": "Version",
        "baseName": "Version",
        "type": "EnvelopedData.VersionEnum"
    }
];
(function (EnvelopedData) {
    let VersionEnum;
    (function (VersionEnum) {
        VersionEnum[VersionEnum["V0"] = 'V0'] = "V0";
        VersionEnum[VersionEnum["V1"] = 'V1'] = "V1";
        VersionEnum[VersionEnum["V2"] = 'V2'] = "V2";
        VersionEnum[VersionEnum["V3"] = 'V3'] = "V3";
        VersionEnum[VersionEnum["V4"] = 'V4'] = "V4";
        VersionEnum[VersionEnum["V5"] = 'V5'] = "V5";
    })(VersionEnum = EnvelopedData.VersionEnum || (EnvelopedData.VersionEnum = {}));
})(EnvelopedData = exports.EnvelopedData || (exports.EnvelopedData = {}));
//# sourceMappingURL=envelopedData.js.map