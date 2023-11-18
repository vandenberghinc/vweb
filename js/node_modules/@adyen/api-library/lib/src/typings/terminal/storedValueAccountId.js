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
exports.StoredValueAccountId = void 0;
class StoredValueAccountId {
    static getAttributeTypeMap() {
        return StoredValueAccountId.attributeTypeMap;
    }
}
exports.StoredValueAccountId = StoredValueAccountId;
StoredValueAccountId.discriminator = undefined;
StoredValueAccountId.attributeTypeMap = [
    {
        "name": "EntryMode",
        "baseName": "EntryMode",
        "type": "Array<StoredValueAccountId.EntryModeEnum>"
    },
    {
        "name": "ExpiryDate",
        "baseName": "ExpiryDate",
        "type": "string"
    },
    {
        "name": "IdentificationType",
        "baseName": "IdentificationType",
        "type": "IdentificationType"
    },
    {
        "name": "OwnerName",
        "baseName": "OwnerName",
        "type": "string"
    },
    {
        "name": "StoredValueAccountType",
        "baseName": "StoredValueAccountType",
        "type": "StoredValueAccountType"
    },
    {
        "name": "StoredValueProvider",
        "baseName": "StoredValueProvider",
        "type": "string"
    },
    {
        "name": "Value",
        "baseName": "Value",
        "type": "string"
    }
];
(function (StoredValueAccountId) {
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
    })(EntryModeEnum = StoredValueAccountId.EntryModeEnum || (StoredValueAccountId.EntryModeEnum = {}));
})(StoredValueAccountId = exports.StoredValueAccountId || (exports.StoredValueAccountId = {}));
//# sourceMappingURL=storedValueAccountId.js.map