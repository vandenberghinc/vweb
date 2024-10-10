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
exports.CardReaderInitResponse = void 0;
class CardReaderInitResponse {
    static getAttributeTypeMap() {
        return CardReaderInitResponse.attributeTypeMap;
    }
}
exports.CardReaderInitResponse = CardReaderInitResponse;
CardReaderInitResponse.discriminator = undefined;
CardReaderInitResponse.attributeTypeMap = [
    {
        "name": "EntryMode",
        "baseName": "EntryMode",
        "type": "Array<CardReaderInitResponse.EntryModeEnum>"
    },
    {
        "name": "ICCResetData",
        "baseName": "ICCResetData",
        "type": "ICCResetData"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    },
    {
        "name": "TrackData",
        "baseName": "TrackData",
        "type": "Array<TrackData>"
    }
];
(function (CardReaderInitResponse) {
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
    })(EntryModeEnum = CardReaderInitResponse.EntryModeEnum || (CardReaderInitResponse.EntryModeEnum = {}));
})(CardReaderInitResponse = exports.CardReaderInitResponse || (exports.CardReaderInitResponse = {}));
//# sourceMappingURL=cardReaderInitResponse.js.map