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
 * Copyright (c) 2020 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function checkServerIdentity(host, cert) {
    const { subject: { CN } } = cert;
    const re = /^(([a-zA-Z0-9]+-[a-zA-Z0-9]+)|legacy-terminal-certificate)\.(live|test)\.terminal\.adyen\.com$/;
    const isValid = re.test(CN);
    const error = new Error("Couldn't verify certificate");
    return isValid ? undefined : error;
}
exports.default = checkServerIdentity;
//# sourceMappingURL=checkServerIdentity.js.map