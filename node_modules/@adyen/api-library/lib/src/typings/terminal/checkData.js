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
exports.CheckData = void 0;
class CheckData {
    static getAttributeTypeMap() {
        return CheckData.attributeTypeMap;
    }
}
exports.CheckData = CheckData;
CheckData.discriminator = undefined;
CheckData.attributeTypeMap = [
    {
        "name": "AccountNumber",
        "baseName": "AccountNumber",
        "type": "string"
    },
    {
        "name": "BankID",
        "baseName": "BankID",
        "type": "string"
    },
    {
        "name": "CheckCardNumber",
        "baseName": "CheckCardNumber",
        "type": "string"
    },
    {
        "name": "CheckNumber",
        "baseName": "CheckNumber",
        "type": "string"
    },
    {
        "name": "Country",
        "baseName": "Country",
        "type": "string"
    },
    {
        "name": "TrackData",
        "baseName": "TrackData",
        "type": "TrackData"
    },
    {
        "name": "TypeCode",
        "baseName": "TypeCode",
        "type": "CheckData.TypeCodeEnum"
    }
];
(function (CheckData) {
    let TypeCodeEnum;
    (function (TypeCodeEnum) {
        TypeCodeEnum[TypeCodeEnum["Company"] = 'Company'] = "Company";
        TypeCodeEnum[TypeCodeEnum["Personal"] = 'Personal'] = "Personal";
    })(TypeCodeEnum = CheckData.TypeCodeEnum || (CheckData.TypeCodeEnum = {}));
})(CheckData = exports.CheckData || (exports.CheckData = {}));
//# sourceMappingURL=checkData.js.map