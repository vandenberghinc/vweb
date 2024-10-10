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
exports.EnableServiceRequest = void 0;
class EnableServiceRequest {
    static getAttributeTypeMap() {
        return EnableServiceRequest.attributeTypeMap;
    }
}
exports.EnableServiceRequest = EnableServiceRequest;
EnableServiceRequest.discriminator = undefined;
EnableServiceRequest.attributeTypeMap = [
    {
        "name": "DisplayOutput",
        "baseName": "DisplayOutput",
        "type": "DisplayOutput"
    },
    {
        "name": "ServicesEnabled",
        "baseName": "ServicesEnabled",
        "type": "Array<EnableServiceRequest.ServicesEnabledEnum>"
    },
    {
        "name": "TransactionAction",
        "baseName": "TransactionAction",
        "type": "TransactionActionType"
    }
];
(function (EnableServiceRequest) {
    let ServicesEnabledEnum;
    (function (ServicesEnabledEnum) {
        ServicesEnabledEnum[ServicesEnabledEnum["CardAcquisition"] = 'CardAcquisition'] = "CardAcquisition";
        ServicesEnabledEnum[ServicesEnabledEnum["Loyalty"] = 'Loyalty'] = "Loyalty";
        ServicesEnabledEnum[ServicesEnabledEnum["Payment"] = 'Payment'] = "Payment";
    })(ServicesEnabledEnum = EnableServiceRequest.ServicesEnabledEnum || (EnableServiceRequest.ServicesEnabledEnum = {}));
})(EnableServiceRequest = exports.EnableServiceRequest || (exports.EnableServiceRequest = {}));
//# sourceMappingURL=enableServiceRequest.js.map