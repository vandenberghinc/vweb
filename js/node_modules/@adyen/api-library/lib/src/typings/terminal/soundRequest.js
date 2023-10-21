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
exports.SoundRequest = void 0;
class SoundRequest {
    static getAttributeTypeMap() {
        return SoundRequest.attributeTypeMap;
    }
}
exports.SoundRequest = SoundRequest;
SoundRequest.discriminator = undefined;
SoundRequest.attributeTypeMap = [
    {
        "name": "ResponseMode",
        "baseName": "ResponseMode",
        "type": "SoundRequest.ResponseModeEnum"
    },
    {
        "name": "SoundAction",
        "baseName": "SoundAction",
        "type": "SoundActionType"
    },
    {
        "name": "SoundContent",
        "baseName": "SoundContent",
        "type": "SoundContent"
    },
    {
        "name": "SoundVolume",
        "baseName": "SoundVolume",
        "type": "number"
    }
];
(function (SoundRequest) {
    let ResponseModeEnum;
    (function (ResponseModeEnum) {
        ResponseModeEnum[ResponseModeEnum["Immediate"] = 'Immediate'] = "Immediate";
        ResponseModeEnum[ResponseModeEnum["NotRequired"] = 'NotRequired'] = "NotRequired";
        ResponseModeEnum[ResponseModeEnum["PrintEnd"] = 'PrintEnd'] = "PrintEnd";
        ResponseModeEnum[ResponseModeEnum["SoundEnd"] = 'SoundEnd'] = "SoundEnd";
    })(ResponseModeEnum = SoundRequest.ResponseModeEnum || (SoundRequest.ResponseModeEnum = {}));
})(SoundRequest = exports.SoundRequest || (exports.SoundRequest = {}));
//# sourceMappingURL=soundRequest.js.map