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
exports.InputRequest = void 0;
class InputRequest {
    static getAttributeTypeMap() {
        return InputRequest.attributeTypeMap;
    }
}
exports.InputRequest = InputRequest;
InputRequest.discriminator = undefined;
InputRequest.attributeTypeMap = [
    {
        "name": "DisplayOutput",
        "baseName": "DisplayOutput",
        "type": "DisplayOutput"
    },
    {
        "name": "InputData",
        "baseName": "InputData",
        "type": "InputData"
    }
];
//# sourceMappingURL=inputRequest.js.map