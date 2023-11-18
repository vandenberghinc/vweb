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
exports.CardReaderInitRequest = void 0;
class CardReaderInitRequest {
    static getAttributeTypeMap() {
        return CardReaderInitRequest.attributeTypeMap;
    }
}
exports.CardReaderInitRequest = CardReaderInitRequest;
CardReaderInitRequest.discriminator = undefined;
CardReaderInitRequest.attributeTypeMap = [
    {
        "name": "DisplayOutput",
        "baseName": "DisplayOutput",
        "type": "DisplayOutput"
    },
    {
        "name": "ForceEntryMode",
        "baseName": "ForceEntryMode",
        "type": "Array<CardReaderInitRequest.ForceEntryModeEnum>"
    },
    {
        "name": "LeaveCardFlag",
        "baseName": "LeaveCardFlag",
        "type": "boolean"
    },
    {
        "name": "MaxWaitingTime",
        "baseName": "MaxWaitingTime",
        "type": "number"
    },
    {
        "name": "WarmResetFlag",
        "baseName": "WarmResetFlag",
        "type": "boolean"
    }
];
(function (CardReaderInitRequest) {
    let ForceEntryModeEnum;
    (function (ForceEntryModeEnum) {
        ForceEntryModeEnum[ForceEntryModeEnum["CheckReader"] = 'CheckReader'] = "CheckReader";
        ForceEntryModeEnum[ForceEntryModeEnum["Contactless"] = 'Contactless'] = "Contactless";
        ForceEntryModeEnum[ForceEntryModeEnum["File"] = 'File'] = "File";
        ForceEntryModeEnum[ForceEntryModeEnum["Icc"] = 'ICC'] = "Icc";
        ForceEntryModeEnum[ForceEntryModeEnum["Keyed"] = 'Keyed'] = "Keyed";
        ForceEntryModeEnum[ForceEntryModeEnum["MagStripe"] = 'MagStripe'] = "MagStripe";
        ForceEntryModeEnum[ForceEntryModeEnum["Manual"] = 'Manual'] = "Manual";
        ForceEntryModeEnum[ForceEntryModeEnum["Rfid"] = 'RFID'] = "Rfid";
        ForceEntryModeEnum[ForceEntryModeEnum["Scanned"] = 'Scanned'] = "Scanned";
        ForceEntryModeEnum[ForceEntryModeEnum["SynchronousIcc"] = 'SynchronousICC'] = "SynchronousIcc";
        ForceEntryModeEnum[ForceEntryModeEnum["Tapped"] = 'Tapped'] = "Tapped";
    })(ForceEntryModeEnum = CardReaderInitRequest.ForceEntryModeEnum || (CardReaderInitRequest.ForceEntryModeEnum = {}));
})(CardReaderInitRequest = exports.CardReaderInitRequest || (exports.CardReaderInitRequest = {}));
//# sourceMappingURL=cardReaderInitRequest.js.map