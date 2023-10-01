/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Imports.

const zlib = require('zlib');

// ---------------------------------------------------------
// Request object.

class Request {

    // Constructor.
    constructor(req) {

        // Arguments.
        this.req = req;

        // Body.
        this.body = "";

        // Create a promise to await the incoming data.
        this.req.on("data", (data) => {
            this.body += data.toString();
        })
        this.promise = new Promise((resolve) => {
            this.req.on("end", () => {
                resolve();
            })
        })

        // Copy all lowercase functions.
        this.on = this.req.on.bind(this.req);
        // this.cork = this.req.cork.bind(this.req);
        this.destroy = this.req.destroy.bind(this.req);
        // this.uncork = this.req.uncork.bind(this.req);
        // this.write = this.req.write.bind(this.req);

        // Create lowercase functions.
        // this.flush_headers = this.req.flushHeaders.bind(this.req);
        // this.get_header = this.req.getHeader.bind(this.req);
        // this.get_header_names = this.req.getHeaderNames.bind(this.req);
        // this.get_headers = this.req.getHeaders.bind(this.req);
        // this.get_raw_header_names = this.req.getRawHeaderNames.bind(this.req);
        // this.has_header = this.req.hasHeader.bind(this.req);
        // this.max_headers_count = this.req.maxHeadersCount.bind(this.req);
        // this.remove_header = this.req.removeHeader.bind(this.req);
        // this.set_header = this.req.setHeader.bind(this.req);
        // this.set_no_delay = this.req.setNoDelay.bind(this.req);
        // this.set_socket_keep_alive = this.req.setSocketKeepAlive.bind(this.req);
        this.set_timeout = this.req.setTimeout;

        // Attributes.
        this._params = undefined;
        this._is_query_params = false;
        this._endpoint = undefined;
        this._query_string = undefined;
    }

    // ---------------------------------------------------------
    // Utils.

    // Parse endpoint.
    _parse_endoint() {
        if (this._endpoint !== undefined) {return}
        this._endpoint = this.req.url;
        let index;
        if ((index = this._endpoint.indexOf("?")) !== -1) {
            this._query_string =  this._endpoint.substr(index + 1);
            this._endpoint =  this._endpoint.substr(0, index);
        }
    }

    // Parse the parameters.
    _parse_params() {

        // Parse query string.
        this._parse_endoint();

        // Already parsed.
        if (this._params !== undefined) {return}

        // Initialize.
        this._params = {};

        // By query string.
        if (this._query_string !== undefined) {

            // As encoded json.
            if (this._query_string.charAt(0) === "{") {
                try {
                    this._params = JSON.parse(decodeURIComponent(this._query_string));
                } catch(err) {
                    throw Error(`Invalid json request query: ${err}.`)
                }
            }

            // As query string.
            else {
                this._is_query_params = true;
                let is_key = true, key = "", value = "";
                for (let i = 0; i < this._query_string.length; i++) {
                    const c = this._query_string.charAt(i);
                    if (is_key && c === "=") {
                        is_key = false;
                    } else if (is_key === false && c === "&") {
                        this._params[decodeURIComponent(key)] = decodeURIComponent(value);
                        key = "";
                        value = "";
                        is_key = true;
                    }
                    if (is_key) {
                        key += c;
                    } else {
                        value += c;
                    }
                }
                if (key.length > 0) {
                    this._params[decodeURIComponent(key)] = decodeURIComponent(value);
                }
            }
        }

        // By body.
        else if (this.body.first_not_of([" ", "\t", "\n", "\r"]) === "{") {
            try {
                this._params = JSON.parse(this.body);
            } catch(err) {
                throw Error(`Invalid json request body: ${err}.`)
            }
        }


        // Handler.
        return this._params;
    }

    // ---------------------------------------------------------
    // Functions.

    // Get the requests ip.
    get ip() {
        return this.req.socket.remoteAddress;
    }

    // Get the requests port.
    get port() {
        return this.req.socket.remotePort;
    }

    // Get the endpoint.
    get endpoint() {
        if (this._endpoint !== undefined) {
            return this._endpoint;
        }
        this._parse_endoint();
        return this._endpoint;
    }

    // Get the params.
    get params() {
        if (this._params !== undefined) {
            return this._params;
        }
        this._parse_params();
        return this._params;
    }

    // Get a param by name and optionally by type.
    // Throws an error when the parameter does not exist or the type is different from the specified type(s).
    // Valid types are ["null", "boolean", "number", "string", "array", "object"];
    param(name, type = null) {

        // Parse params.
        this._parse_params();

        // Get value.
        let value = this._params[name];

        // Check type.
        if (type !== null) {

            // Vars.
            let is_type_array = Array.isArray(type);

            // Wrapper funcs.
            const type_str = () => {
                let str = "";
                if (type !== null) {
                    str += " type "
                    if (is_type_array) {
                        let i = 0, one_but_last_i = type.length - 2;
                        type.iterate((item) => {
                            str += `"${item}"`;
                            if (i < one_but_last_i) {
                                str += ", ";
                            } else if (i === one_but_last_i) {
                                str += " or ";
                            }
                        })
                    } else {
                        str += `"${type}"`;
                    }
                }
                return str;
            }
            const type_eq_or_includes = (match) => {
                if (is_type_array) {
                    return type.includes(match);
                }
                return match === type;
            }

            // Check undefined.
            if (value === undefined) {
                throw Error(`Define parameter "${name}"${type_str()}.`)
            }

            // Cast the value to another type when a query string was used.
            if (this._is_query_params && type_eq_or_includes("string") === false) {
                if (is_type_array === false) {
                    type = [type];
                }
                const success = type.iterate((type) => {
                    
                    // Convert to string.
                    if (type === "string") {
                        return true;
                    }

                    // Convert to null.
                    if (type === "null" && value === "null") {
                        value = null;
                        return true;
                    }

                    // Convert to boolean.
                    const is_bool = type === "boolean";
                    if (is_boolean && value === "true") {
                        value = true;
                        return true;
                    }
                    if (is_boolean && value === "false") {
                        value = false;
                        return true;
                    }

                    // Convert to array.
                    if (value === "array") {
                        value = value.split(",");
                        return true;
                    }

                    // Convert to object.
                    if (value === "object") {
                        const split = value.split(",");
                        value = {};
                        split.iterate((item) => {
                            const pair = item.split(":")
                            value[pair[0]] = pair[1];
                        })
                        return true;
                    }

                    // Convert to numeric.
                    if (type === "number" && value.is_numeric_string()) {
                        value = parseFloat(value);
                        return true;
                    }
                })
                if (success !== true) {
                    throw Error(`Parameter "${name} should be of"${type_str()}.`)
                }

            }

            // Check the type when no query params are defined since JSON.parse already parsed the types.
            else if (this._is_query_params === false) {
                const value_type = typeof value;
                if (is_type_array === false) {
                    type = [type];
                }
                const success = type.iterate((type) => {
                    const l_is_array = type === "array";
                    const l_is_null = type === "array";

                    // Same type.
                    if (l_is_array === false && l_is_null === false && type === value_type) {
                        return true;
                    }

                    // Check to null.
                    if (l_is_null && value === null) {
                        return true;
                    }

                    // Convert to array.
                    if (l_is_array && Array.isArray(value)) {
                        return true;
                    }
                })
                if (success !== true) {
                    throw Error(`Parameter "${name} should be of"${type_str()}.`)
                }
            }
        }

        // Check undefined.
        else if (value === undefined) {
            throw Error(`Define parameter "${name}".`)
        }

        // Return value.
        return value;
    }

    // ---------------------------------------------------------
    // Inherit get and set functions.

    get headers() {
        return this.req.headers;
    }
    get destroyed() {
        return this.req.destroyed;
    }
    set destroyed(val) {
        return this.req.destroyed = val;
    }
    get path() {
        return this.req.path;
    }
    set path(val) {
        return this.req.path = val;
    }
    get method() {
        return this.req.method;
    }
    set method(val) {
        return this.req.method = val;
    }
    get url() {
        return this.req.url;
    }
    set url(val) {
        return this.req.url = val;
    }
    get host() {
        return this.req.host;
    }
    set host(val) {
        return this.req.host = val;
    }
    get protocol() {
        return this.req.protocol;
    }
    set protocol(val) {
        return this.req.protocol = val;
    }
    get reused_socket() {
        return this.req.reusedSocket;
    }
    set reused_socket(val) {
        return this.req.reusedSocket = val;
    }
    get socket() {
        return this.req.socket;
    }
    set socket(val) {
        return this.req.socket = val;
    }
    get writable_ended() {
        return this.req.writableEnded;
    }
    set writable_ended(val) {
        return this.req.writableEnded = val;
    }
    get writable_finished() {
        return this.req.writableFinished;
    }
    set writable_finished(val) {
        return this.req.writableFinished = val;
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = Request;
