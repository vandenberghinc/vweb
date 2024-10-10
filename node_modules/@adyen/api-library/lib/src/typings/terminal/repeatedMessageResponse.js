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
exports.RepeatedMessageResponse = void 0;
class RepeatedMessageResponse {
    static getAttributeTypeMap() {
        return RepeatedMessageResponse.attributeTypeMap;
    }
}
exports.RepeatedMessageResponse = RepeatedMessageResponse;
RepeatedMessageResponse.discriminator = undefined;
RepeatedMessageResponse.attributeTypeMap = [
    {
        "name": "MessageHeader",
        "baseName": "MessageHeader",
        "type": "MessageHeader"
    },
    {
        "name": "RepeatedResponseMessageBody",
        "baseName": "RepeatedResponseMessageBody",
        "type": "RepeatedResponseMessageBody"
    }
];
//# sourceMappingURL=repeatedMessageResponse.js.map