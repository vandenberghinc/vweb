import Service from "../service";
import HttpClientException from "../httpClient/httpClientException";
import ApiException from "./exception/apiException";
import { IRequest } from "../typings/requestOptions";
declare class Resource {
    private endpoint;
    private service;
    constructor(service: Service, endpoint: string);
    request(json: string, requestOptions?: IRequest.Options): Promise<string | HttpClientException | ApiException>;
}
export default Resource;
