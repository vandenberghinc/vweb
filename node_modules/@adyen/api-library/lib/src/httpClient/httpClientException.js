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
class HttpClientException extends Error {
    constructor(props) {
        super(props.message);
        this.statusCode = 500;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = "HttpClientException";
        if (props.responseHeaders)
            this.responseHeaders = props.responseHeaders;
        if (props.responseBody)
            this.responseBody = props.responseBody;
        if (props.errorCode)
            this.errorCode = props.errorCode;
        if (props.statusCode)
            this.statusCode = props.statusCode;
    }
}
exports.default = HttpClientException;
//# sourceMappingURL=httpClientException.js.map