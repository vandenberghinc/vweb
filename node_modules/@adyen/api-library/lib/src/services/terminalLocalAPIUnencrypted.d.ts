import Service from "../service";
import Client from "../client";
import { TerminalApiRequest, TerminalApiResponse } from "../typings/terminal/models";
declare class TerminalLocalAPIUnencrypted extends Service {
    private readonly localRequest;
    /**
     * @summary This is the unencrypted local terminal API (only works in TEST).
     * Use this for testing your local integration parallel to the encryption setup.
     * Be sure to remove all encryption details in your CA terminal config page.
     * @param client {@link Client }
     */
    constructor(client: Client);
    request(terminalApiRequest: TerminalApiRequest): Promise<TerminalApiResponse>;
}
export default TerminalLocalAPIUnencrypted;
