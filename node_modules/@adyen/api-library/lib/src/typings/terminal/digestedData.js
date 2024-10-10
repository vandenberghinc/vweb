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
exports.DigestedData = void 0;
class DigestedData {
    static getAttributeTypeMap() {
        return DigestedData.attributeTypeMap;
    }
}
exports.DigestedData = DigestedData;
DigestedData.discriminator = undefined;
DigestedData.attributeTypeMap = [
    {
        "name": "Digest",
        "baseName": "Digest",
        "type": "any"
    },
    {
        "name": "DigestAlgorithm",
        "baseName": "DigestAlgorithm",
        "type": "AlgorithmIdentifier"
    },
    {
        "name": "EncapsulatedContent",
        "baseName": "EncapsulatedContent",
        "type": "EncapsulatedContent"
    },
    {
        "name": "Version",
        "baseName": "Version",
        "type": "DigestedData.VersionEnum"
    }
];
(function (DigestedData) {
    let VersionEnum;
    (function (VersionEnum) {
        VersionEnum[VersionEnum["V0"] = 'V0'] = "V0";
        VersionEnum[VersionEnum["V1"] = 'V1'] = "V1";
        VersionEnum[VersionEnum["V2"] = 'V2'] = "V2";
        VersionEnum[VersionEnum["V3"] = 'V3'] = "V3";
        VersionEnum[VersionEnum["V4"] = 'V4'] = "V4";
        VersionEnum[VersionEnum["V5"] = 'V5'] = "V5";
    })(VersionEnum = DigestedData.VersionEnum || (DigestedData.VersionEnum = {}));
})(DigestedData = exports.DigestedData || (exports.DigestedData = {}));
//# sourceMappingURL=digestedData.js.map