/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Response object.

class Response {
    constructor(res) {

        // Arguments.
        this.res = res;

        // Attributes.
        this.cookies = [];

        // Copy default functions.
        // this.addTrailers = this.res.addTrailers;
        this.cork = this.res.cork;
        this.end = this.res.end;
        // this.flushHeaders = this.res.flushHeaders;
        // this.getHeader = this.res.getHeader;
        // this.getHeaderNames = this.res.getHeaderNames;
        // this.getHeaders = this.res.getHeaders;
        // this.hasHeader = this.res.hasHeader;
        // this.removeHeader = this.res.removeHeader;
        // this.setHeader = this.res.setHeader;
        // this.setTimeout = this.res.setTimeout;
        this.uncork = this.res.uncork;
        this.write = this.res.write;
        // this.writeContinue = this.res.writeContinue;
        // this.writeEarlyHints = this.res.writeEarlyHints;
        // this.writeHead = this.res.writeHead;
        // this.writeProcessing = this.res.writeProcessing;

        // Create lowercase functions.
        this.add_trailers = this.res.addTrailers;
        this.flush_headers = this.res.flushHeaders;
        this.get_header = this.res.getHeader;
        this.get_header_names = this.res.getHeaderNames;
        this.get_headers = this.res.getHeaders;
        this.has_header = this.res.hasHeader;
        this.remove_header = this.res.removeHeader;
        this.set_header = this.res.setHeader;
        this.set_timeout = this.res.setTimeout;
        // this.write_continue = this.res.writeContinue;
        // this.write_early_hints = this.res.writeEarlyHints;
        // this.write_head = this.res.writeHead;
        // this.write_processing = this.res.writeProcessing;
    }

    // ---------------------------------------------------------
    // Functions.

    // Send a response.
    send({status = 200, headers = {}, data = null}) {

        // Set status code.
        this.res.statusCode = status;

        // Set headers.
        Object.keys(headers).forEach((key) => {
            this.res.setHeader(key, headers[key]);
        });

        // Set cookies.
        if (this.cookies.length > 0) {
            this.res.setHeader('Set-Cookie', this.cookies);
        }

        // Set data.
        if (data != null) {
            if (typeof data === "string") { this.res.write(data); }
            else { this.res.write(data.toString()); }
        }
        this.res.end();
    }

    // Send a response.
    success({status = 200, headers = {}, data = null}) {
        return this.send({status: status, headers: headers, data: data});
    }
    error({status = 500, headers = {}, data = null}) {
        return this.send({status: status, headers: headers, data: data});
    }

    // Set headers.
    // Does not remove previously assigned headers but adds them to the response instead.
    set_headers(headers = {}) {
        if (headers === null) { return null; }
        Object.keys(headers).forEach((key) => {
            this.res.setHeader(key, headers[key]);
        });
    }

    // Set a cookie(s).
    // @warning: Will only be added to the response when the user uses `send()`, `success()` or `error()`.
    set_cookie(cookie) {
        this.cookies.push(cookie);
    }
    set_cookies(cookies) {
        for (let i = 0; i < cookies.length; i++) {
            this.cookies.push(cookies[i]);
        }
    }

    // ---------------------------------------------------------
    // Defaults.

    // Create lowercase functions for default getters and setters.
    get headers_sent() {
        return this.res.headersSent;
    }
    set headers_sent(val) {
        return this.res.headersSent = val;
    }
    get send_date() {
        return this.res.sendDate;
    }
    set send_date(val) {
        return this.res.sendDate = val;
    }
    get status_code() {
        return this.res.statusCode;
    }
    set status_code(val) {
        return this.res.statusCode = val;
    }
    get status_message() {
        return this.res.statusMessage;
    }
    set status_message(val) {
        return this.res.statusMessage = val;
    }
    get strict_content_length() {
        return this.res.strictContentLength;
    }
    set strict_content_length(val) {
        return this.res.strictContentLength = val;
    }
    get writable_ended() {
        return this.res.writableEnded;
    }
    set writable_ended(val) {
        return this.res.writableEnded = val;
    }
    get finished() {
        return this.res.finished;
    }
    get writable_finished() {
        return this.res.writableFinished;
    }
    set writable_finished(val) {
        return this.res.writableFinished = val;
    }

    // Copy default functions.
    // get headersSent() {
    //     return this.res.headersSent;
    // }
    // set headersSent() {
    //     return this.res.headersSent;
    // }
    // get req() {
    //    return this.res.req;
    // }
    // set req() {
    //    return this.res.req; 
    // }
    // get sendDate() {
    //     return this.res.sendDate;
    // }
    // set sendDate() {
    //     return this.res.sendDate;
    // }
    // get socket() {
    //     return this.res.socket;
    // }
    // set socket() {
    //     return this.res.socket;
    // }
    // get statusCode() {
    //     return this.res.statusCode;
    // }
    // set statusCode() {
    //     return this.res.statusCode;
    // }
    // get statusMessage() {
    //     return this.res.statusMessage;
    // }
    // set statusMessage() {
    //     return this.res.statusMessage;
    // }
    // get strictContentLength() {
    //     return this.res.strictContentLength;
    // }
    // set strictContentLength() {
    //     return this.res.strictContentLength;
    // }
    // get writableEnded() {
    //     return this.res.writableEnded;
    // }
    // set writableEnded() {
    //     return this.res.writableEnded;
    // }
    // get writableFinished() {
    //     return this.res.writableFinished;
    // }
    // set writableFinished() {
    //     return this.res.writableFinished;
    // }
}

// ---------------------------------------------------------
// Exports.

module.exports = Response;
