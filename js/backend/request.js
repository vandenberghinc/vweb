/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Imports.

const zlib = require('zlib');

// ---------------------------------------------------------
// Response object.

class Response {
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
        this.cork = this.req.cork.bind(this.req);
        this.destroy = this.req.destroy.bind(this.req);
        this.uncork = this.req.uncork.bind(this.req);
        this.write = this.req.write.bind(this.req);

        // Create lowercase functions.
        this.flush_headers = this.req.flushHeaders.bind(this.req);
        this.get_header = this.req.getHeader.bind(this.req);
        this.get_header_names = this.req.getHeaderNames.bind(this.req);
        this.get_headers = this.req.getHeaders.bind(this.req);
        this.get_raw_header_names = this.req.getRawHeaderNames.bind(this.req);
        this.has_header = this.req.hasHeader.bind(this.req);
        this.max_headers_count = this.req.maxHeadersCount.bind(this.req);
        this.remove_header = this.req.removeHeader.bind(this.req);
        this.set_header = this.req.setHeader.bind(this.req);
        this.set_no_delay = this.req.setNoDelay.bind(this.req);
        this.set_socket_keep_alive = this.req.setSocketKeepAlive.bind(this.req);
        this.set_timeout = this.req.setTimeout;
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

    // ---------------------------------------------------------
    // Inherit get and set functions.

    // Create lowercase functions for default getters and setters.
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

module.exports = Response;
