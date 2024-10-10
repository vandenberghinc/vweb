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
exports.Rebates = void 0;
class Rebates {
    static getAttributeTypeMap() {
        return Rebates.attributeTypeMap;
    }
}
exports.Rebates = Rebates;
Rebates.discriminator = undefined;
Rebates.attributeTypeMap = [
    {
        "name": "RebateLabel",
        "baseName": "RebateLabel",
        "type": "string"
    },
    {
        "name": "SaleItemRebate",
        "baseName": "SaleItemRebate",
        "type": "Array<SaleItemRebate>"
    },
    {
        "name": "TotalRebate",
        "baseName": "TotalRebate",
        "type": "number"
    }
];
//# sourceMappingURL=rebates.js.map