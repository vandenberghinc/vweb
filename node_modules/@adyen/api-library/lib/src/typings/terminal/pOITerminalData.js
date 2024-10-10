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
exports.POITerminalData = void 0;
class POITerminalData {
    static getAttributeTypeMap() {
        return POITerminalData.attributeTypeMap;
    }
}
exports.POITerminalData = POITerminalData;
POITerminalData.discriminator = undefined;
POITerminalData.attributeTypeMap = [
    {
        "name": "POICapabilities",
        "baseName": "POICapabilities",
        "type": "Array<POITerminalData.POICapabilitiesEnum>"
    },
    {
        "name": "POIProfile",
        "baseName": "POIProfile",
        "type": "POIProfile"
    },
    {
        "name": "POISerialNumber",
        "baseName": "POISerialNumber",
        "type": "string"
    },
    {
        "name": "TerminalEnvironment",
        "baseName": "TerminalEnvironment",
        "type": "TerminalEnvironmentType"
    }
];
(function (POITerminalData) {
    let POICapabilitiesEnum;
    (function (POICapabilitiesEnum) {
        POICapabilitiesEnum[POICapabilitiesEnum["CashHandling"] = 'CashHandling'] = "CashHandling";
        POICapabilitiesEnum[POICapabilitiesEnum["CashierDisplay"] = 'CashierDisplay'] = "CashierDisplay";
        POICapabilitiesEnum[POICapabilitiesEnum["CashierError"] = 'CashierError'] = "CashierError";
        POICapabilitiesEnum[POICapabilitiesEnum["CashierInput"] = 'CashierInput'] = "CashierInput";
        POICapabilitiesEnum[POICapabilitiesEnum["CustomerDisplay"] = 'CustomerDisplay'] = "CustomerDisplay";
        POICapabilitiesEnum[POICapabilitiesEnum["CustomerError"] = 'CustomerError'] = "CustomerError";
        POICapabilitiesEnum[POICapabilitiesEnum["CustomerInput"] = 'CustomerInput'] = "CustomerInput";
        POICapabilitiesEnum[POICapabilitiesEnum["EmvContactless"] = 'EMVContactless'] = "EmvContactless";
        POICapabilitiesEnum[POICapabilitiesEnum["Icc"] = 'ICC'] = "Icc";
        POICapabilitiesEnum[POICapabilitiesEnum["MagStripe"] = 'MagStripe'] = "MagStripe";
        POICapabilitiesEnum[POICapabilitiesEnum["PrinterDocument"] = 'PrinterDocument'] = "PrinterDocument";
        POICapabilitiesEnum[POICapabilitiesEnum["PrinterReceipt"] = 'PrinterReceipt'] = "PrinterReceipt";
        POICapabilitiesEnum[POICapabilitiesEnum["PrinterVoucher"] = 'PrinterVoucher'] = "PrinterVoucher";
    })(POICapabilitiesEnum = POITerminalData.POICapabilitiesEnum || (POITerminalData.POICapabilitiesEnum = {}));
})(POITerminalData = exports.POITerminalData || (exports.POITerminalData = {}));
//# sourceMappingURL=pOITerminalData.js.map