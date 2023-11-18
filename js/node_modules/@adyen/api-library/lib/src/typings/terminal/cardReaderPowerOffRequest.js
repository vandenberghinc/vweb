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
exports.CardReaderPowerOffRequest = void 0;
class CardReaderPowerOffRequest {
    static getAttributeTypeMap() {
        return CardReaderPowerOffRequest.attributeTypeMap;
    }
}
exports.CardReaderPowerOffRequest = CardReaderPowerOffRequest;
CardReaderPowerOffRequest.discriminator = undefined;
CardReaderPowerOffRequest.attributeTypeMap = [
    {
        "name": "DisplayOutput",
        "baseName": "DisplayOutput",
        "type": "DisplayOutput"
    },
    {
        "name": "MaxWaitingTime",
        "baseName": "MaxWaitingTime",
        "type": "number"
    }
];
//# sourceMappingURL=cardReaderPowerOffRequest.js.map