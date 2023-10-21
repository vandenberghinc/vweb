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
exports.NotificationItem = void 0;
class NotificationItem {
    static getAttributeTypeMap() {
        return NotificationItem.attributeTypeMap;
    }
}
exports.NotificationItem = NotificationItem;
NotificationItem.discriminator = undefined;
NotificationItem.attributeTypeMap = [
    {
        "name": "NotificationRequestItem",
        "baseName": "NotificationRequestItem",
        "type": "NotificationRequestItem"
    }
];
//# sourceMappingURL=notificationItem.js.map