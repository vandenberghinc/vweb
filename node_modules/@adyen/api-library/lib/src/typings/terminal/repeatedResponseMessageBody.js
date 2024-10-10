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
exports.RepeatedResponseMessageBody = void 0;
class RepeatedResponseMessageBody {
    static getAttributeTypeMap() {
        return RepeatedResponseMessageBody.attributeTypeMap;
    }
}
exports.RepeatedResponseMessageBody = RepeatedResponseMessageBody;
RepeatedResponseMessageBody.discriminator = undefined;
RepeatedResponseMessageBody.attributeTypeMap = [
    {
        "name": "CardAcquisitionResponse",
        "baseName": "CardAcquisitionResponse",
        "type": "CardAcquisitionResponse"
    },
    {
        "name": "CardReaderAPDUResponse",
        "baseName": "CardReaderAPDUResponse",
        "type": "CardReaderAPDUResponse"
    },
    {
        "name": "LoyaltyResponse",
        "baseName": "LoyaltyResponse",
        "type": "LoyaltyResponse"
    },
    {
        "name": "PaymentResponse",
        "baseName": "PaymentResponse",
        "type": "PaymentResponse"
    },
    {
        "name": "ReversalResponse",
        "baseName": "ReversalResponse",
        "type": "ReversalResponse"
    },
    {
        "name": "StoredValueResponse",
        "baseName": "StoredValueResponse",
        "type": "StoredValueResponse"
    }
];
//# sourceMappingURL=repeatedResponseMessageBody.js.map