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
exports.AuthenticatedData = void 0;
class AuthenticatedData {
    static getAttributeTypeMap() {
        return AuthenticatedData.attributeTypeMap;
    }
}
exports.AuthenticatedData = AuthenticatedData;
AuthenticatedData.discriminator = undefined;
AuthenticatedData.attributeTypeMap = [
    {
        "name": "EncapsulatedContent",
        "baseName": "EncapsulatedContent",
        "type": "EncapsulatedContent"
    },
    {
        "name": "KeyTransportOrKEK",
        "baseName": "KeyTransportOrKEK",
        "type": "Array<any>"
    },
    {
        "name": "MAC",
        "baseName": "MAC",
        "type": "any"
    },
    {
        "name": "MACAlgorithm",
        "baseName": "MACAlgorithm",
        "type": "AlgorithmIdentifier"
    },
    {
        "name": "Version",
        "baseName": "Version",
        "type": "AuthenticatedData.VersionEnum"
    }
];
(function (AuthenticatedData) {
    let VersionEnum;
    (function (VersionEnum) {
        VersionEnum[VersionEnum["V0"] = 'V0'] = "V0";
        VersionEnum[VersionEnum["V1"] = 'V1'] = "V1";
        VersionEnum[VersionEnum["V2"] = 'V2'] = "V2";
        VersionEnum[VersionEnum["V3"] = 'V3'] = "V3";
        VersionEnum[VersionEnum["V4"] = 'V4'] = "V4";
        VersionEnum[VersionEnum["V5"] = 'V5'] = "V5";
    })(VersionEnum = AuthenticatedData.VersionEnum || (AuthenticatedData.VersionEnum = {}));
})(AuthenticatedData = exports.AuthenticatedData || (exports.AuthenticatedData = {}));
//# sourceMappingURL=authenticatedData.js.map