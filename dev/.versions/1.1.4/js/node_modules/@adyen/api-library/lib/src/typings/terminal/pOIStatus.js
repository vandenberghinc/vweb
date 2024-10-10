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
exports.POIStatus = void 0;
class POIStatus {
    static getAttributeTypeMap() {
        return POIStatus.attributeTypeMap;
    }
}
exports.POIStatus = POIStatus;
POIStatus.discriminator = undefined;
POIStatus.attributeTypeMap = [
    {
        "name": "CardReaderOKFlag",
        "baseName": "CardReaderOKFlag",
        "type": "boolean"
    },
    {
        "name": "CashHandlingDevice",
        "baseName": "CashHandlingDevice",
        "type": "Array<CashHandlingDevice>"
    },
    {
        "name": "CommunicationOKFlag",
        "baseName": "CommunicationOKFlag",
        "type": "boolean"
    },
    {
        "name": "FraudPreventionFlag",
        "baseName": "FraudPreventionFlag",
        "type": "boolean"
    },
    {
        "name": "GlobalStatus",
        "baseName": "GlobalStatus",
        "type": "GlobalStatusType"
    },
    {
        "name": "PEDOKFlag",
        "baseName": "PEDOKFlag",
        "type": "boolean"
    },
    {
        "name": "PrinterStatus",
        "baseName": "PrinterStatus",
        "type": "POIStatus.PrinterStatusEnum"
    },
    {
        "name": "SecurityOKFlag",
        "baseName": "SecurityOKFlag",
        "type": "boolean"
    }
];
(function (POIStatus) {
    let PrinterStatusEnum;
    (function (PrinterStatusEnum) {
        PrinterStatusEnum[PrinterStatusEnum["NoPaper"] = 'NoPaper'] = "NoPaper";
        PrinterStatusEnum[PrinterStatusEnum["Ok"] = 'OK'] = "Ok";
        PrinterStatusEnum[PrinterStatusEnum["OutOfOrder"] = 'OutOfOrder'] = "OutOfOrder";
        PrinterStatusEnum[PrinterStatusEnum["PaperJam"] = 'PaperJam'] = "PaperJam";
        PrinterStatusEnum[PrinterStatusEnum["PaperLow"] = 'PaperLow'] = "PaperLow";
    })(PrinterStatusEnum = POIStatus.PrinterStatusEnum || (POIStatus.PrinterStatusEnum = {}));
})(POIStatus = exports.POIStatus || (exports.POIStatus = {}));
//# sourceMappingURL=pOIStatus.js.map