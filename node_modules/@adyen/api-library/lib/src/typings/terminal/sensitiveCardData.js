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
exports.SensitiveCardData = void 0;
class SensitiveCardData {
    static getAttributeTypeMap() {
        return SensitiveCardData.attributeTypeMap;
    }
}
exports.SensitiveCardData = SensitiveCardData;
SensitiveCardData.discriminator = undefined;
SensitiveCardData.attributeTypeMap = [
    {
        "name": "CardSeqNumb",
        "baseName": "CardSeqNumb",
        "type": "string"
    },
    {
        "name": "ExpiryDate",
        "baseName": "ExpiryDate",
        "type": "string"
    },
    {
        "name": "PAN",
        "baseName": "PAN",
        "type": "string"
    },
    {
        "name": "TrackData",
        "baseName": "TrackData",
        "type": "Array<TrackData>"
    }
];
//# sourceMappingURL=sensitiveCardData.js.map