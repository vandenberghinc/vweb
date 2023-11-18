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
exports.Notification = void 0;
class Notification {
    static getAttributeTypeMap() {
        return Notification.attributeTypeMap;
    }
}
exports.Notification = Notification;
Notification.discriminator = undefined;
Notification.attributeTypeMap = [
    {
        "name": "live",
        "baseName": "live",
        "type": "string"
    },
    {
        "name": "notificationItems",
        "baseName": "notificationItems",
        "type": "Array<NotificationItem>"
    }
];
//# sourceMappingURL=notification.js.map