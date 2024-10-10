"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * Copyright (c) 2020 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
const models_1 = require("../typings/notification/models");
class NotificationRequest {
    constructor(json) {
        const notification = models_1.ObjectSerializer.deserialize(json, "Notification");
        this.notificationItemContainers = notification.notificationItems;
        this.live = notification.live;
    }
    get notificationItems() {
        if (!this.notificationItemContainers) {
            return undefined;
        }
        return this.notificationItemContainers.map((container) => container.NotificationRequestItem);
    }
}
exports.default = NotificationRequest;
//# sourceMappingURL=notificationRequest.js.map