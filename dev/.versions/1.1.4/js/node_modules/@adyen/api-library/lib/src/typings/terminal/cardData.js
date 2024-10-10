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
 * Copyright (c) 2022 Adyen N.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardData = void 0;
class CardData {
    static getAttributeTypeMap() {
        return CardData.attributeTypeMap;
    }
}
exports.CardData = CardData;
CardData.discriminator = undefined;
CardData.attributeTypeMap = [
    {
        "name": "AllowedProduct",
        "baseName": "AllowedProduct",
        "type": "Array<AllowedProduct>"
    },
    {
        "name": "AllowedProductCode",
        "baseName": "AllowedProductCode",
        "type": "Array<string>"
    },
    {
        "name": "CardCountryCode",
        "baseName": "CardCountryCode",
        "type": "string"
    },
    {
        "name": "CustomerOrder",
        "baseName": "CustomerOrder",
        "type": "Array<CustomerOrder>"
    },
    {
        "name": "EntryMode",
        "baseName": "EntryMode",
        "type": "Array<CardData.EntryModeEnum>"
    },
    {
        "name": "MaskedPan",
        "baseName": "MaskedPan",
        "type": "string"
    },
    {
        "name": "PaymentAccountRef",
        "baseName": "PaymentAccountRef",
        "type": "string"
    },
    {
        "name": "PaymentBrand",
        "baseName": "PaymentBrand",
        "type": "string"
    },
    {
        "name": "PaymentToken",
        "baseName": "PaymentToken",
        "type": "PaymentToken"
    },
    {
        "name": "ProtectedCardData",
        "baseName": "ProtectedCardData",
        "type": "ContentInformation"
    },
    {
        "name": "SensitiveCardData",
        "baseName": "SensitiveCardData",
        "type": "SensitiveCardData"
    }
];
(function (CardData) {
    let EntryModeEnum;
    (function (EntryModeEnum) {
        EntryModeEnum[EntryModeEnum["Contactless"] = 'Contactless'] = "Contactless";
        EntryModeEnum[EntryModeEnum["File"] = 'File'] = "File";
        EntryModeEnum[EntryModeEnum["Icc"] = 'ICC'] = "Icc";
        EntryModeEnum[EntryModeEnum["Keyed"] = 'Keyed'] = "Keyed";
        EntryModeEnum[EntryModeEnum["MagStripe"] = 'MagStripe'] = "MagStripe";
        EntryModeEnum[EntryModeEnum["Manual"] = 'Manual'] = "Manual";
        EntryModeEnum[EntryModeEnum["Mobile"] = 'Mobile'] = "Mobile";
        EntryModeEnum[EntryModeEnum["Rfid"] = 'RFID'] = "Rfid";
        EntryModeEnum[EntryModeEnum["Scanned"] = 'Scanned'] = "Scanned";
        EntryModeEnum[EntryModeEnum["SynchronousIcc"] = 'SynchronousICC'] = "SynchronousIcc";
        EntryModeEnum[EntryModeEnum["Tapped"] = 'Tapped'] = "Tapped";
    })(EntryModeEnum = CardData.EntryModeEnum || (CardData.EntryModeEnum = {}));
})(CardData = exports.CardData || (exports.CardData = {}));
//# sourceMappingURL=cardData.js.map