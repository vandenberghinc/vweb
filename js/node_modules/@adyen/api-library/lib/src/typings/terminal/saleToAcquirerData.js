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
exports.SaleToAcquirerData = void 0;
class SaleToAcquirerData {
    static getAttributeTypeMap() {
        return SaleToAcquirerData.attributeTypeMap;
    }
}
exports.SaleToAcquirerData = SaleToAcquirerData;
SaleToAcquirerData.discriminator = undefined;
SaleToAcquirerData.attributeTypeMap = [
    {
        "name": "applicationInfo",
        "baseName": "applicationInfo",
        "type": "ApplicationInfo"
    },
    {
        "name": "shopperEmail",
        "baseName": "shopperEmail",
        "type": "string"
    },
    {
        "name": "shopperReference",
        "baseName": "shopperReference",
        "type": "string"
    },
    {
        "name": "recurringContract",
        "baseName": "recurringContract",
        "type": "string"
    },
    {
        "name": "shopperStatement",
        "baseName": "shopperStatement",
        "type": "string"
    },
    {
        "name": "recurringDetailName",
        "baseName": "recurringDetailName",
        "type": "string"
    },
    {
        "name": "store",
        "baseName": "store",
        "type": "string"
    },
    {
        "name": "merchantAccount",
        "baseName": "merchantAccount",
        "type": "string"
    },
    {
        "name": "currency",
        "baseName": "currency",
        "type": "string"
    },
    {
        "name": "tenderOption",
        "baseName": "tenderOption",
        "type": "string"
    },
    {
        "name": "additionalData",
        "baseName": "additionalData",
        "type": "object"
    },
    {
        "name": "metadata",
        "baseName": "metadata",
        "type": "{ [key: string]: string; }"
    }
];
//# sourceMappingURL=saleToAcquirerData.js.map