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
exports.SaleToPOISecuredMessage = void 0;
class SaleToPOISecuredMessage {
    static getAttributeTypeMap() {
        return SaleToPOISecuredMessage.attributeTypeMap;
    }
}
exports.SaleToPOISecuredMessage = SaleToPOISecuredMessage;
SaleToPOISecuredMessage.discriminator = undefined;
SaleToPOISecuredMessage.attributeTypeMap = [
    {
        "name": "MessageHeader",
        "baseName": "MessageHeader",
        "type": "MessageHeader"
    },
    {
        "name": "NexoBlob",
        "baseName": "NexoBlob",
        "type": "string"
    },
    {
        "name": "SecurityTrailer",
        "baseName": "SecurityTrailer",
        "type": "SecurityTrailer"
    }
];
//# sourceMappingURL=saleToPOISecuredMessage.js.map