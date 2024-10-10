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
exports.EventNotification = void 0;
class EventNotification {
    static getAttributeTypeMap() {
        return EventNotification.attributeTypeMap;
    }
}
exports.EventNotification = EventNotification;
EventNotification.discriminator = undefined;
EventNotification.attributeTypeMap = [
    {
        "name": "CustomerLanguage",
        "baseName": "CustomerLanguage",
        "type": "string"
    },
    {
        "name": "DisplayOutput",
        "baseName": "DisplayOutput",
        "type": "DisplayOutput"
    },
    {
        "name": "EventDetails",
        "baseName": "EventDetails",
        "type": "string"
    },
    {
        "name": "EventToNotify",
        "baseName": "EventToNotify",
        "type": "EventToNotifyType"
    },
    {
        "name": "MaintenanceRequiredFlag",
        "baseName": "MaintenanceRequiredFlag",
        "type": "boolean"
    },
    {
        "name": "RejectedMessage",
        "baseName": "RejectedMessage",
        "type": "any"
    },
    {
        "name": "TimeStamp",
        "baseName": "TimeStamp",
        "type": "string"
    }
];
//# sourceMappingURL=eventNotification.js.map