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
exports.POISystemData = void 0;
class POISystemData {
    static getAttributeTypeMap() {
        return POISystemData.attributeTypeMap;
    }
}
exports.POISystemData = POISystemData;
POISystemData.discriminator = undefined;
POISystemData.attributeTypeMap = [
    {
        "name": "DateTime",
        "baseName": "DateTime",
        "type": "{ [key: string]: any; }"
    },
    {
        "name": "POISoftware",
        "baseName": "POISoftware",
        "type": "POISoftware"
    },
    {
        "name": "POIStatus",
        "baseName": "POIStatus",
        "type": "POIStatus"
    },
    {
        "name": "POITerminalData",
        "baseName": "POITerminalData",
        "type": "POITerminalData"
    }
];
//# sourceMappingURL=pOISystemData.js.map