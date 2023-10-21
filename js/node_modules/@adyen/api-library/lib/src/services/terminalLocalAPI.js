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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../service"));
const getJsonResponse_1 = __importDefault(require("../helpers/getJsonResponse"));
const nexoCrypto_1 = __importDefault(require("../security/nexoCrypto"));
const localRequest_1 = __importDefault(require("./resource/terminal/local/localRequest"));
const models_1 = require("../typings/terminal/models");
class TerminalLocalAPI extends service_1.default {
    constructor(client) {
        super(client);
        this.apiKeyRequired = true;
        this.localRequest = new localRequest_1.default(this);
        this.nexoCrypto = new nexoCrypto_1.default();
    }
    async request(terminalApiRequest, securityKey) {
        const formattedRequest = models_1.ObjectSerializer.serialize(terminalApiRequest, "TerminalApiRequest");
        const saleToPoiSecuredMessage = nexoCrypto_1.default.encrypt(terminalApiRequest.SaleToPOIRequest.MessageHeader, JSON.stringify(formattedRequest), securityKey);
        const securedPaymentRequest = models_1.ObjectSerializer.serialize({
            SaleToPOIRequest: saleToPoiSecuredMessage,
        }, "TerminalApiSecuredRequest");
        const jsonResponse = await (0, getJsonResponse_1.default)(this.localRequest, securedPaymentRequest);
        // Catch an empty jsonResponse (i.e. Abort Request)
        if (!jsonResponse) {
            return new models_1.TerminalApiResponse();
        }
        else {
            const terminalApiSecuredResponse = models_1.ObjectSerializer.deserialize(jsonResponse, "TerminalApiSecuredResponse");
            const response = this.nexoCrypto.decrypt(terminalApiSecuredResponse.SaleToPOIResponse, securityKey);
            return models_1.ObjectSerializer.deserialize(JSON.parse(response), "TerminalApiResponse");
        }
    }
}
exports.default = TerminalLocalAPI;
//# sourceMappingURL=terminalLocalAPI.js.map