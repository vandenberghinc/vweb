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
exports.MessageHeader = void 0;
class MessageHeader {
    static getAttributeTypeMap() {
        return MessageHeader.attributeTypeMap;
    }
}
exports.MessageHeader = MessageHeader;
MessageHeader.discriminator = undefined;
MessageHeader.attributeTypeMap = [
    {
        "name": "DeviceID",
        "baseName": "DeviceID",
        "type": "string"
    },
    {
        "name": "MessageCategory",
        "baseName": "MessageCategory",
        "type": "MessageCategoryType"
    },
    {
        "name": "MessageClass",
        "baseName": "MessageClass",
        "type": "MessageClassType"
    },
    {
        "name": "MessageType",
        "baseName": "MessageType",
        "type": "MessageType"
    },
    {
        "name": "POIID",
        "baseName": "POIID",
        "type": "string"
    },
    {
        "name": "ProtocolVersion",
        "baseName": "ProtocolVersion",
        "type": "string"
    },
    {
        "name": "SaleID",
        "baseName": "SaleID",
        "type": "string"
    },
    {
        "name": "ServiceID",
        "baseName": "ServiceID",
        "type": "string"
    }
];
//# sourceMappingURL=messageHeader.js.map