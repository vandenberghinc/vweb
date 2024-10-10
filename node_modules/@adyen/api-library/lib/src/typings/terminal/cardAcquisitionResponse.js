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
exports.CardAcquisitionResponse = void 0;
class CardAcquisitionResponse {
    static getAttributeTypeMap() {
        return CardAcquisitionResponse.attributeTypeMap;
    }
}
exports.CardAcquisitionResponse = CardAcquisitionResponse;
CardAcquisitionResponse.discriminator = undefined;
CardAcquisitionResponse.attributeTypeMap = [
    {
        "name": "CustomerOrder",
        "baseName": "CustomerOrder",
        "type": "Array<CustomerOrder>"
    },
    {
        "name": "LoyaltyAccount",
        "baseName": "LoyaltyAccount",
        "type": "Array<LoyaltyAccount>"
    },
    {
        "name": "PaymentBrand",
        "baseName": "PaymentBrand",
        "type": "Array<string>"
    },
    {
        "name": "PaymentInstrumentData",
        "baseName": "PaymentInstrumentData",
        "type": "PaymentInstrumentData"
    },
    {
        "name": "POIData",
        "baseName": "POIData",
        "type": "POIData"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    },
    {
        "name": "SaleData",
        "baseName": "SaleData",
        "type": "SaleData"
    }
];
//# sourceMappingURL=cardAcquisitionResponse.js.map