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
exports.MobileData = void 0;
class MobileData {
    static getAttributeTypeMap() {
        return MobileData.attributeTypeMap;
    }
}
exports.MobileData = MobileData;
MobileData.discriminator = undefined;
MobileData.attributeTypeMap = [
    {
        "name": "Geolocation",
        "baseName": "Geolocation",
        "type": "Geolocation"
    },
    {
        "name": "MaskedMSISDN",
        "baseName": "MaskedMSISDN",
        "type": "string"
    },
    {
        "name": "MobileCountryCode",
        "baseName": "MobileCountryCode",
        "type": "string"
    },
    {
        "name": "MobileNetworkCode",
        "baseName": "MobileNetworkCode",
        "type": "string"
    },
    {
        "name": "ProtectedMobileData",
        "baseName": "ProtectedMobileData",
        "type": "ContentInformation"
    },
    {
        "name": "SensitiveMobileData",
        "baseName": "SensitiveMobileData",
        "type": "SensitiveMobileData"
    }
];
//# sourceMappingURL=mobileData.js.map