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
exports.Signer = void 0;
class Signer {
    static getAttributeTypeMap() {
        return Signer.attributeTypeMap;
    }
}
exports.Signer = Signer;
Signer.discriminator = undefined;
Signer.attributeTypeMap = [
    {
        "name": "DigestAlgorithm",
        "baseName": "DigestAlgorithm",
        "type": "AlgorithmIdentifier"
    },
    {
        "name": "Signature",
        "baseName": "Signature",
        "type": "any"
    },
    {
        "name": "SignatureAlgorithm",
        "baseName": "SignatureAlgorithm",
        "type": "AlgorithmIdentifier"
    },
    {
        "name": "SignerIdentifier",
        "baseName": "SignerIdentifier",
        "type": "SignerIdentifier"
    },
    {
        "name": "Version",
        "baseName": "Version",
        "type": "Signer.VersionEnum"
    }
];
(function (Signer) {
    let VersionEnum;
    (function (VersionEnum) {
        VersionEnum[VersionEnum["V0"] = 'V0'] = "V0";
        VersionEnum[VersionEnum["V1"] = 'V1'] = "V1";
        VersionEnum[VersionEnum["V2"] = 'V2'] = "V2";
        VersionEnum[VersionEnum["V3"] = 'V3'] = "V3";
        VersionEnum[VersionEnum["V4"] = 'V4'] = "V4";
        VersionEnum[VersionEnum["V5"] = 'V5'] = "V5";
    })(VersionEnum = Signer.VersionEnum || (Signer.VersionEnum = {}));
})(Signer = exports.Signer || (exports.Signer = {}));
//# sourceMappingURL=signer.js.map