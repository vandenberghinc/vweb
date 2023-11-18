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
exports.AbortRequest = void 0;
class AbortRequest {
    static getAttributeTypeMap() {
        return AbortRequest.attributeTypeMap;
    }
}
exports.AbortRequest = AbortRequest;
AbortRequest.discriminator = undefined;
AbortRequest.attributeTypeMap = [
    {
        "name": "AbortReason",
        "baseName": "AbortReason",
        "type": "string"
    },
    {
        "name": "DisplayOutput",
        "baseName": "DisplayOutput",
        "type": "DisplayOutput"
    },
    {
        "name": "MessageReference",
        "baseName": "MessageReference",
        "type": "MessageReference"
    }
];
//# sourceMappingURL=abortRequest.js.map