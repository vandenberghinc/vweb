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
exports.LoyaltyAccountStatus = void 0;
class LoyaltyAccountStatus {
    static getAttributeTypeMap() {
        return LoyaltyAccountStatus.attributeTypeMap;
    }
}
exports.LoyaltyAccountStatus = LoyaltyAccountStatus;
LoyaltyAccountStatus.discriminator = undefined;
LoyaltyAccountStatus.attributeTypeMap = [
    {
        "name": "Currency",
        "baseName": "Currency",
        "type": "string"
    },
    {
        "name": "CurrentBalance",
        "baseName": "CurrentBalance",
        "type": "number"
    },
    {
        "name": "LoyaltyAccount",
        "baseName": "LoyaltyAccount",
        "type": "LoyaltyAccount"
    },
    {
        "name": "LoyaltyUnit",
        "baseName": "LoyaltyUnit",
        "type": "LoyaltyAccountStatus.LoyaltyUnitEnum"
    }
];
(function (LoyaltyAccountStatus) {
    let LoyaltyUnitEnum;
    (function (LoyaltyUnitEnum) {
        LoyaltyUnitEnum[LoyaltyUnitEnum["Monetary"] = 'Monetary'] = "Monetary";
        LoyaltyUnitEnum[LoyaltyUnitEnum["Point"] = 'Point'] = "Point";
    })(LoyaltyUnitEnum = LoyaltyAccountStatus.LoyaltyUnitEnum || (LoyaltyAccountStatus.LoyaltyUnitEnum = {}));
})(LoyaltyAccountStatus = exports.LoyaltyAccountStatus || (exports.LoyaltyAccountStatus = {}));
//# sourceMappingURL=loyaltyAccountStatus.js.map