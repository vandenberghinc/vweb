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
exports.DiagnosisResponse = void 0;
class DiagnosisResponse {
    static getAttributeTypeMap() {
        return DiagnosisResponse.attributeTypeMap;
    }
}
exports.DiagnosisResponse = DiagnosisResponse;
DiagnosisResponse.discriminator = undefined;
DiagnosisResponse.attributeTypeMap = [
    {
        "name": "HostStatus",
        "baseName": "HostStatus",
        "type": "Array<HostStatus>"
    },
    {
        "name": "LoggedSaleID",
        "baseName": "LoggedSaleID",
        "type": "Array<string>"
    },
    {
        "name": "POIStatus",
        "baseName": "POIStatus",
        "type": "POIStatus"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=diagnosisResponse.js.map