import { CapitalApi } from "./capitalApi";
import { TransactionsApi } from "./transactionsApi";
import { TransfersApi } from "./transfersApi";
import Service from "../../service";
import Client from "../../client";
export default class TransfersAPI extends Service {
    constructor(client: Client);
    get CapitalApi(): CapitalApi;
    get TransactionsApi(): TransactionsApi;
    get TransfersApi(): TransfersApi;
}
