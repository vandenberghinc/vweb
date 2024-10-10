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
exports.SaleTerminalData = void 0;
class SaleTerminalData {
    static getAttributeTypeMap() {
        return SaleTerminalData.attributeTypeMap;
    }
}
exports.SaleTerminalData = SaleTerminalData;
SaleTerminalData.discriminator = undefined;
SaleTerminalData.attributeTypeMap = [
    {
        "name": "SaleCapabilities",
        "baseName": "SaleCapabilities",
        "type": "Array<SaleTerminalData.SaleCapabilitiesEnum>"
    },
    {
        "name": "SaleProfile",
        "baseName": "SaleProfile",
        "type": "SaleProfile"
    },
    {
        "name": "TerminalEnvironment",
        "baseName": "TerminalEnvironment",
        "type": "SaleTerminalData.TerminalEnvironmentEnum"
    },
    {
        "name": "TotalsGroupID",
        "baseName": "TotalsGroupID",
        "type": "string"
    }
];
(function (SaleTerminalData) {
    let SaleCapabilitiesEnum;
    (function (SaleCapabilitiesEnum) {
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CashierDisplay"] = 'CashierDisplay'] = "CashierDisplay";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CashierError"] = 'CashierError'] = "CashierError";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CashierInput"] = 'CashierInput'] = "CashierInput";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CashierStatus"] = 'CashierStatus'] = "CashierStatus";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CustomerAssistance"] = 'CustomerAssistance'] = "CustomerAssistance";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CustomerDisplay"] = 'CustomerDisplay'] = "CustomerDisplay";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CustomerError"] = 'CustomerError'] = "CustomerError";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["CustomerInput"] = 'CustomerInput'] = "CustomerInput";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["EmvContactless"] = 'EMVContactless'] = "EmvContactless";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["Icc"] = 'ICC'] = "Icc";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["MagStripe"] = 'MagStripe'] = "MagStripe";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["PoiReplication"] = 'POIReplication'] = "PoiReplication";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["PrinterDocument"] = 'PrinterDocument'] = "PrinterDocument";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["PrinterReceipt"] = 'PrinterReceipt'] = "PrinterReceipt";
        SaleCapabilitiesEnum[SaleCapabilitiesEnum["PrinterVoucher"] = 'PrinterVoucher'] = "PrinterVoucher";
    })(SaleCapabilitiesEnum = SaleTerminalData.SaleCapabilitiesEnum || (SaleTerminalData.SaleCapabilitiesEnum = {}));
    let TerminalEnvironmentEnum;
    (function (TerminalEnvironmentEnum) {
        TerminalEnvironmentEnum[TerminalEnvironmentEnum["Attended"] = 'Attended'] = "Attended";
        TerminalEnvironmentEnum[TerminalEnvironmentEnum["SemiAttended"] = 'SemiAttended'] = "SemiAttended";
        TerminalEnvironmentEnum[TerminalEnvironmentEnum["Unattended"] = 'Unattended'] = "Unattended";
    })(TerminalEnvironmentEnum = SaleTerminalData.TerminalEnvironmentEnum || (SaleTerminalData.TerminalEnvironmentEnum = {}));
})(SaleTerminalData = exports.SaleTerminalData || (exports.SaleTerminalData = {}));
//# sourceMappingURL=saleTerminalData.js.map