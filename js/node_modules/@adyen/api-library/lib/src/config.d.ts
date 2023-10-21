interface ConfigConstructor {
    username?: string;
    password?: string;
    environment?: Environment;
    marketPayEndpoint?: string;
    applicationName?: string;
    apiKey?: string;
    connectionTimeoutMillis?: number;
    certificatePath?: string;
    terminalApiCloudEndpoint?: string;
    terminalApiLocalEndpoint?: string;
}
declare class Config {
    username?: string;
    password?: string;
    environment?: Environment;
    marketPayEndpoint?: string;
    applicationName?: string;
    apiKey?: string;
    connectionTimeoutMillis?: number;
    certificatePath?: string;
    terminalApiCloudEndpoint?: string;
    terminalApiLocalEndpoint?: string;
    constructor(options?: ConfigConstructor);
}
export default Config;
