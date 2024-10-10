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
exports.LoyaltyAccountId = void 0;
class LoyaltyAccountId {
    static getAttributeTypeMap() {
        return LoyaltyAccountId.attributeTypeMap;
    }
}
exports.LoyaltyAccountId = LoyaltyAccountId;
LoyaltyAccountId.discriminator = undefined;
LoyaltyAccountId.attributeTypeMap = [
    {
        "name": "EntryMode",
        "baseName": "EntryMode",
        "type": "Array<LoyaltyAccountId.EntryModeEnum>"
    },
    {
        "name": "IdentificationSupport",
        "baseName": "IdentificationSupport",
        "type": "LoyaltyAccountId.IdentificationSupportEnum"
    },
    {
        "name": "IdentificationType",
        "baseName": "IdentificationType",
        "type": "IdentificationType"
    },
    {
        "name": "Value",
        "baseName": "Value",
        "type": "string"
    }
];
(function (LoyaltyAccountId) {
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
    })(EntryModeEnum = LoyaltyAccountId.EntryModeEnum || (LoyaltyAccountId.EntryModeEnum = {}));
    let IdentificationSupportEnum;
    (function (IdentificationSupportEnum) {
        IdentificationSupportEnum[IdentificationSupportEnum["HybridCard"] = 'HybridCard'] = "HybridCard";
        IdentificationSupportEnum[IdentificationSupportEnum["LinkedCard"] = 'LinkedCard'] = "LinkedCard";
        IdentificationSupportEnum[IdentificationSupportEnum["LoyaltyCard"] = 'LoyaltyCard'] = "LoyaltyCard";
        IdentificationSupportEnum[IdentificationSupportEnum["NoCard"] = 'NoCard'] = "NoCard";
    })(IdentificationSupportEnum = LoyaltyAccountId.IdentificationSupportEnum || (LoyaltyAccountId.IdentificationSupportEnum = {}));
})(LoyaltyAccountId = exports.LoyaltyAccountId || (exports.LoyaltyAccountId = {}));
//# sourceMappingURL=loyaltyAccountId.js.map