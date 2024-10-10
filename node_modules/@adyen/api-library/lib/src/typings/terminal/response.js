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
exports.Response = void 0;
class Response {
    static getAttributeTypeMap() {
        return Response.attributeTypeMap;
    }
}
exports.Response = Response;
Response.discriminator = undefined;
Response.attributeTypeMap = [
    {
        "name": "AdditionalResponse",
        "baseName": "AdditionalResponse",
        "type": "string"
    },
    {
        "name": "ErrorCondition",
        "baseName": "ErrorCondition",
        "type": "Response.ErrorConditionEnum"
    },
    {
        "name": "Result",
        "baseName": "Result",
        "type": "ResultType"
    }
];
(function (Response) {
    let ErrorConditionEnum;
    (function (ErrorConditionEnum) {
        ErrorConditionEnum[ErrorConditionEnum["Aborted"] = 'Aborted'] = "Aborted";
        ErrorConditionEnum[ErrorConditionEnum["Busy"] = 'Busy'] = "Busy";
        ErrorConditionEnum[ErrorConditionEnum["Cancel"] = 'Cancel'] = "Cancel";
        ErrorConditionEnum[ErrorConditionEnum["DeviceOut"] = 'DeviceOut'] = "DeviceOut";
        ErrorConditionEnum[ErrorConditionEnum["InProgress"] = 'InProgress'] = "InProgress";
        ErrorConditionEnum[ErrorConditionEnum["InsertedCard"] = 'InsertedCard'] = "InsertedCard";
        ErrorConditionEnum[ErrorConditionEnum["InvalidCard"] = 'InvalidCard'] = "InvalidCard";
        ErrorConditionEnum[ErrorConditionEnum["LoggedOut"] = 'LoggedOut'] = "LoggedOut";
        ErrorConditionEnum[ErrorConditionEnum["MessageFormat"] = 'MessageFormat'] = "MessageFormat";
        ErrorConditionEnum[ErrorConditionEnum["NotAllowed"] = 'NotAllowed'] = "NotAllowed";
        ErrorConditionEnum[ErrorConditionEnum["NotFound"] = 'NotFound'] = "NotFound";
        ErrorConditionEnum[ErrorConditionEnum["PaymentRestriction"] = 'PaymentRestriction'] = "PaymentRestriction";
        ErrorConditionEnum[ErrorConditionEnum["Refusal"] = 'Refusal'] = "Refusal";
        ErrorConditionEnum[ErrorConditionEnum["UnavailableDevice"] = 'UnavailableDevice'] = "UnavailableDevice";
        ErrorConditionEnum[ErrorConditionEnum["UnavailableService"] = 'UnavailableService'] = "UnavailableService";
        ErrorConditionEnum[ErrorConditionEnum["UnreachableHost"] = 'UnreachableHost'] = "UnreachableHost";
        ErrorConditionEnum[ErrorConditionEnum["WrongPin"] = 'WrongPIN'] = "WrongPin";
    })(ErrorConditionEnum = Response.ErrorConditionEnum || (Response.ErrorConditionEnum = {}));
})(Response = exports.Response || (exports.Response = {}));
//# sourceMappingURL=response.js.map