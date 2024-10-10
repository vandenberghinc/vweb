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
exports.PINRequest = void 0;
class PINRequest {
    static getAttributeTypeMap() {
        return PINRequest.attributeTypeMap;
    }
}
exports.PINRequest = PINRequest;
PINRequest.discriminator = undefined;
PINRequest.attributeTypeMap = [
    {
        "name": "AdditionalInput",
        "baseName": "AdditionalInput",
        "type": "string"
    },
    {
        "name": "CardholderPIN",
        "baseName": "CardholderPIN",
        "type": "CardholderPIN"
    },
    {
        "name": "KeyReference",
        "baseName": "KeyReference",
        "type": "string"
    },
    {
        "name": "MaxWaitingTime",
        "baseName": "MaxWaitingTime",
        "type": "number"
    },
    {
        "name": "PINEncAlgorithm",
        "baseName": "PINEncAlgorithm",
        "type": "string"
    },
    {
        "name": "PINFormat",
        "baseName": "PINFormat",
        "type": "PINRequest.PINFormatEnum"
    },
    {
        "name": "PINRequestType",
        "baseName": "PINRequestType",
        "type": "PINRequestType"
    },
    {
        "name": "PINVerifMethod",
        "baseName": "PINVerifMethod",
        "type": "string"
    }
];
(function (PINRequest) {
    let PINFormatEnum;
    (function (PINFormatEnum) {
        PINFormatEnum[PINFormatEnum["Iso0"] = 'ISO0'] = "Iso0";
        PINFormatEnum[PINFormatEnum["Iso1"] = 'ISO1'] = "Iso1";
        PINFormatEnum[PINFormatEnum["Iso2"] = 'ISO2'] = "Iso2";
        PINFormatEnum[PINFormatEnum["Iso3"] = 'ISO3'] = "Iso3";
    })(PINFormatEnum = PINRequest.PINFormatEnum || (PINRequest.PINFormatEnum = {}));
})(PINRequest = exports.PINRequest || (exports.PINRequest = {}));
//# sourceMappingURL=pINRequest.js.map