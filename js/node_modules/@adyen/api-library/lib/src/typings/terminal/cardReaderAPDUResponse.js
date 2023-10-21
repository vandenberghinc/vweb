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
exports.CardReaderAPDUResponse = void 0;
class CardReaderAPDUResponse {
    static getAttributeTypeMap() {
        return CardReaderAPDUResponse.attributeTypeMap;
    }
}
exports.CardReaderAPDUResponse = CardReaderAPDUResponse;
CardReaderAPDUResponse.discriminator = undefined;
CardReaderAPDUResponse.attributeTypeMap = [
    {
        "name": "APDUData",
        "baseName": "APDUData",
        "type": "any"
    },
    {
        "name": "CardStatusWords",
        "baseName": "CardStatusWords",
        "type": "any"
    },
    {
        "name": "Response",
        "baseName": "Response",
        "type": "Response"
    }
];
//# sourceMappingURL=cardReaderAPDUResponse.js.map