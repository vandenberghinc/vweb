"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../service"));
const getJsonResponse_1 = __importDefault(require("../helpers/getJsonResponse"));
const localRequest_1 = __importDefault(require("./resource/terminal/local/localRequest"));
const models_1 = require("../typings/terminal/models");
class TerminalLocalAPIUnencrypted extends service_1.default {
    /**
     * @summary This is the unencrypted local terminal API (only works in TEST).
     * Use this for testing your local integration parallel to the encryption setup.
     * Be sure to remove all encryption details in your CA terminal config page.
     * @param client {@link Client }
     */
    constructor(client) {
        super(client);
        this.apiKeyRequired = true;
        this.localRequest = new localRequest_1.default(this);
        client.config.certificatePath = "unencrypted";
    }
    async request(terminalApiRequest) {
        const request = models_1.ObjectSerializer.serialize(terminalApiRequest, "TerminalApiRequest");
        const jsonResponse = await (0, getJsonResponse_1.default)(this.localRequest, request);
        // Catch an empty jsonResponse (i.e. Abort Request)
        if (!jsonResponse) {
            return new models_1.TerminalApiResponse();
        }
        else {
            return models_1.ObjectSerializer.deserialize(jsonResponse, "TerminalApiResponse");
        }
    }
}
exports.default = TerminalLocalAPIUnencrypted;
//# sourceMappingURL=terminalLocalAPIUnencrypted.js.map