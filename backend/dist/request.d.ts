export = Request;
declare class Request {
    constructor(req: any);
    req: any;
    body: string;
    promise: Promise<any>;
    on: any;
    destroy: any;
    set_timeout: any;
    _params: any;
    _is_query_params: boolean;
    _endpoint: any;
    _query_string: any;
    _cookies: {} | undefined;
    _uid: any;
    _parse_endoint(): void;
    _parse_params(): any;
    _parse_cookies(name: any, request: any): null | undefined;
    get ip(): any;
    get port(): any;
    set uid(value: any);
    get uid(): any;
    get endpoint(): any;
    get params(): any;
    param(name: any, type?: null, def?: undefined): any;
    get cookies(): {} | undefined;
    get headers(): any;
    set destroyed(val: any);
    get destroyed(): any;
    set path(val: any);
    get path(): any;
    set method(val: any);
    get method(): any;
    set url(val: any);
    get url(): any;
    set host(val: any);
    get host(): any;
    set protocol(val: any);
    get protocol(): any;
    set reused_socket(val: any);
    get reused_socket(): any;
    set socket(val: any);
    get socket(): any;
    set writable_ended(val: any);
    get writable_ended(): any;
    set writable_finished(val: any);
    get writable_finished(): any;
}