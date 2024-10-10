"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(options = {}) {
        if (options.username)
            this.username = options.username;
        if (options.password)
            this.password = options.password;
        if (options.environment)
            this.environment = options.environment;
        if (options.marketPayEndpoint)
            this.marketPayEndpoint = options.marketPayEndpoint;
        if (options.applicationName)
            this.applicationName = options.applicationName;
        if (options.apiKey)
            this.apiKey = options.apiKey;
        if (options.connectionTimeoutMillis)
            this.connectionTimeoutMillis = options.connectionTimeoutMillis || 30000;
        if (options.certificatePath)
            this.certificatePath = options.certificatePath;
        if (options.terminalApiCloudEndpoint)
            this.terminalApiCloudEndpoint = options.terminalApiCloudEndpoint;
        if (options.terminalApiLocalEndpoint)
            this.terminalApiLocalEndpoint = options.terminalApiLocalEndpoint;
    }
}
exports.default = Config;
//# sourceMappingURL=config.js.map