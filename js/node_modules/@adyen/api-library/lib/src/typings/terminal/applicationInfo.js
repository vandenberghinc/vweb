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
exports.ApplicationInfo = void 0;
class ApplicationInfo {
    static getAttributeTypeMap() {
        return ApplicationInfo.attributeTypeMap;
    }
}
exports.ApplicationInfo = ApplicationInfo;
ApplicationInfo.discriminator = undefined;
ApplicationInfo.attributeTypeMap = [
    {
        "name": "adyenLibrary",
        "baseName": "adyenLibrary",
        "type": "CommonField"
    },
    {
        "name": "adyenPaymentSource",
        "baseName": "adyenPaymentSource",
        "type": "CommonField"
    },
    {
        "name": "externalPlatform",
        "baseName": "externalPlatform",
        "type": "ExternalPlatform"
    },
    {
        "name": "merchantApplication",
        "baseName": "merchantApplication",
        "type": "CommonField"
    },
    {
        "name": "merchantDevice",
        "baseName": "merchantDevice",
        "type": "MerchantDevice"
    },
    {
        "name": "paymentDetailsSource",
        "baseName": "paymentDetailsSource",
        "type": "CommonField"
    },
    {
        "name": "shopperInteractionDevice",
        "baseName": "shopperInteractionDevice",
        "type": "ShopperInteractionDevice"
    }
];
//# sourceMappingURL=applicationInfo.js.map