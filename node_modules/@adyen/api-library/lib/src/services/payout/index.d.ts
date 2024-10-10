import { InitializationApi } from "./initializationApi";
import { InstantPayoutsApi } from "./instantPayoutsApi";
import { ReviewingApi } from "./reviewingApi";
import Service from "../../service";
import Client from "../../client";
export default class PayoutAPI extends Service {
    constructor(client: Client);
    get InitializationApi(): InitializationApi;
    get InstantPayoutsApi(): InstantPayoutsApi;
    get ReviewingApi(): ReviewingApi;
}
