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
exports.Geolocation = void 0;
class Geolocation {
    static getAttributeTypeMap() {
        return Geolocation.attributeTypeMap;
    }
}
exports.Geolocation = Geolocation;
Geolocation.discriminator = undefined;
Geolocation.attributeTypeMap = [
    {
        "name": "GeographicCoordinates",
        "baseName": "GeographicCoordinates",
        "type": "GeographicCoordinates"
    },
    {
        "name": "UTMCoordinates",
        "baseName": "UTMCoordinates",
        "type": "UTMCoordinates"
    }
];
//# sourceMappingURL=geolocation.js.map