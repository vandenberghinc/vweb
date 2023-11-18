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
exports.AlgorithmIdentifier = void 0;
class AlgorithmIdentifier {
    static getAttributeTypeMap() {
        return AlgorithmIdentifier.attributeTypeMap;
    }
}
exports.AlgorithmIdentifier = AlgorithmIdentifier;
AlgorithmIdentifier.discriminator = undefined;
AlgorithmIdentifier.attributeTypeMap = [
    {
        "name": "Algorithm",
        "baseName": "Algorithm",
        "type": "AlgorithmType"
    },
    {
        "name": "Parameter",
        "baseName": "Parameter",
        "type": "Parameter"
    }
];
//# sourceMappingURL=algorithmIdentifier.js.map