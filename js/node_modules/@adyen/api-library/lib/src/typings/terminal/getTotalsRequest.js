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
exports.GetTotalsRequest = void 0;
class GetTotalsRequest {
    static getAttributeTypeMap() {
        return GetTotalsRequest.attributeTypeMap;
    }
}
exports.GetTotalsRequest = GetTotalsRequest;
GetTotalsRequest.discriminator = undefined;
GetTotalsRequest.attributeTypeMap = [
    {
        "name": "TotalDetails",
        "baseName": "TotalDetails",
        "type": "Array<GetTotalsRequest.TotalDetailsEnum>"
    },
    {
        "name": "TotalFilter",
        "baseName": "TotalFilter",
        "type": "TotalFilter"
    }
];
(function (GetTotalsRequest) {
    let TotalDetailsEnum;
    (function (TotalDetailsEnum) {
        TotalDetailsEnum[TotalDetailsEnum["OperatorId"] = 'OperatorID'] = "OperatorId";
        TotalDetailsEnum[TotalDetailsEnum["Poiid"] = 'POIID'] = "Poiid";
        TotalDetailsEnum[TotalDetailsEnum["SaleId"] = 'SaleID'] = "SaleId";
        TotalDetailsEnum[TotalDetailsEnum["ShiftNumber"] = 'ShiftNumber'] = "ShiftNumber";
        TotalDetailsEnum[TotalDetailsEnum["TotalsGroupId"] = 'TotalsGroupID'] = "TotalsGroupId";
    })(TotalDetailsEnum = GetTotalsRequest.TotalDetailsEnum || (GetTotalsRequest.TotalDetailsEnum = {}));
})(GetTotalsRequest = exports.GetTotalsRequest || (exports.GetTotalsRequest = {}));
//# sourceMappingURL=getTotalsRequest.js.map