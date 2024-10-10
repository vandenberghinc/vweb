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
exports.LoginRequest = void 0;
class LoginRequest {
    static getAttributeTypeMap() {
        return LoginRequest.attributeTypeMap;
    }
}
exports.LoginRequest = LoginRequest;
LoginRequest.discriminator = undefined;
LoginRequest.attributeTypeMap = [
    {
        "name": "CustomerOrderReq",
        "baseName": "CustomerOrderReq",
        "type": "Array<LoginRequest.CustomerOrderReqEnum>"
    },
    {
        "name": "DateTime",
        "baseName": "DateTime",
        "type": "{ [key: string]: any; }"
    },
    {
        "name": "OperatorID",
        "baseName": "OperatorID",
        "type": "string"
    },
    {
        "name": "OperatorLanguage",
        "baseName": "OperatorLanguage",
        "type": "string"
    },
    {
        "name": "POISerialNumber",
        "baseName": "POISerialNumber",
        "type": "string"
    },
    {
        "name": "SaleSoftware",
        "baseName": "SaleSoftware",
        "type": "SaleSoftware"
    },
    {
        "name": "SaleTerminalData",
        "baseName": "SaleTerminalData",
        "type": "SaleTerminalData"
    },
    {
        "name": "ShiftNumber",
        "baseName": "ShiftNumber",
        "type": "string"
    },
    {
        "name": "TokenRequestedType",
        "baseName": "TokenRequestedType",
        "type": "LoginRequest.TokenRequestedTypeEnum"
    },
    {
        "name": "TrainingModeFlag",
        "baseName": "TrainingModeFlag",
        "type": "boolean"
    }
];
(function (LoginRequest) {
    let CustomerOrderReqEnum;
    (function (CustomerOrderReqEnum) {
        CustomerOrderReqEnum[CustomerOrderReqEnum["Both"] = 'Both'] = "Both";
        CustomerOrderReqEnum[CustomerOrderReqEnum["Closed"] = 'Closed'] = "Closed";
        CustomerOrderReqEnum[CustomerOrderReqEnum["Open"] = 'Open'] = "Open";
    })(CustomerOrderReqEnum = LoginRequest.CustomerOrderReqEnum || (LoginRequest.CustomerOrderReqEnum = {}));
    let TokenRequestedTypeEnum;
    (function (TokenRequestedTypeEnum) {
        TokenRequestedTypeEnum[TokenRequestedTypeEnum["Customer"] = 'Customer'] = "Customer";
        TokenRequestedTypeEnum[TokenRequestedTypeEnum["Transaction"] = 'Transaction'] = "Transaction";
    })(TokenRequestedTypeEnum = LoginRequest.TokenRequestedTypeEnum || (LoginRequest.TokenRequestedTypeEnum = {}));
})(LoginRequest = exports.LoginRequest || (exports.LoginRequest = {}));
//# sourceMappingURL=loginRequest.js.map