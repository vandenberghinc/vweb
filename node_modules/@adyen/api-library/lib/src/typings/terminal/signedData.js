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
exports.SignedData = void 0;
class SignedData {
    static getAttributeTypeMap() {
        return SignedData.attributeTypeMap;
    }
}
exports.SignedData = SignedData;
SignedData.discriminator = undefined;
SignedData.attributeTypeMap = [
    {
        "name": "Certificate",
        "baseName": "Certificate",
        "type": "Array<any>"
    },
    {
        "name": "DigestAlgorithm",
        "baseName": "DigestAlgorithm",
        "type": "Array<AlgorithmIdentifier>"
    },
    {
        "name": "EncapsulatedContent",
        "baseName": "EncapsulatedContent",
        "type": "EncapsulatedContent"
    },
    {
        "name": "Signer",
        "baseName": "Signer",
        "type": "Array<Signer>"
    },
    {
        "name": "Version",
        "baseName": "Version",
        "type": "SignedData.VersionEnum"
    }
];
(function (SignedData) {
    let VersionEnum;
    (function (VersionEnum) {
        VersionEnum[VersionEnum["V0"] = 'V0'] = "V0";
        VersionEnum[VersionEnum["V1"] = 'V1'] = "V1";
        VersionEnum[VersionEnum["V2"] = 'V2'] = "V2";
        VersionEnum[VersionEnum["V3"] = 'V3'] = "V3";
        VersionEnum[VersionEnum["V4"] = 'V4'] = "V4";
        VersionEnum[VersionEnum["V5"] = 'V5'] = "V5";
    })(VersionEnum = SignedData.VersionEnum || (SignedData.VersionEnum = {}));
})(SignedData = exports.SignedData || (exports.SignedData = {}));
//# sourceMappingURL=signedData.js.map