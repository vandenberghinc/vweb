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
exports.ReconciliationRequest = void 0;
class ReconciliationRequest {
    static getAttributeTypeMap() {
        return ReconciliationRequest.attributeTypeMap;
    }
}
exports.ReconciliationRequest = ReconciliationRequest;
ReconciliationRequest.discriminator = undefined;
ReconciliationRequest.attributeTypeMap = [
    {
        "name": "AcquirerID",
        "baseName": "AcquirerID",
        "type": "Array<string>"
    },
    {
        "name": "POIReconciliationID",
        "baseName": "POIReconciliationID",
        "type": "string"
    },
    {
        "name": "ReconciliationType",
        "baseName": "ReconciliationType",
        "type": "ReconciliationType"
    }
];
//# sourceMappingURL=reconciliationRequest.js.map