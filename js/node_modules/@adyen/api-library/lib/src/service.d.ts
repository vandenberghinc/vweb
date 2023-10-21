import Client from "./client";
declare class Service {
    apiKeyRequired: boolean;
    client: Client;
    protected constructor(client: Client);
    protected createBaseUrl(url: string): string;
}
export default Service;
