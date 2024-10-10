"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../../client"));
const resource_1 = __importDefault(require("../../resource"));
class PlatformsHostedOnboardingPage extends resource_1.default {
    constructor(service, endpoint) {
        super(service, `${service.client.config.marketPayEndpoint}/Hop/${client_1.default.MARKETPAY_HOP_API_VERSION}${endpoint}`);
    }
}
exports.default = PlatformsHostedOnboardingPage;
//# sourceMappingURL=hop.js.map