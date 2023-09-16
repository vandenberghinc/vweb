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
    constructor(res) {

        // Arguments.
        this.res = res;

        // Attributes.
        this.cookies = [];

        // Copy default functions.
        // this.addTrailers = this.res.addTrailers;
        this.cork = this.res.cork.bind(this.res);
        this.end = this.res.end.bind(this.res);
        // this.flushHeaders = this.res.flushHeaders;
        // this.getHeader = this.res.getHeader;
        // this.getHeaderNames = this.res.getHeaderNames;
        // this.getHeaders = this.res.getHeaders;
        // this.hasHeader = this.res.hasHeader;
        // this.removeHeader = this.res.removeHeader;
        // this.setHeader = this.res.setHeader;
        // this.setTimeout = this.res.setTimeout;
        this.uncork = this.res.uncork.bind(this.res);
        this.write = this.res.write.bind(this.res);
        // this.writeContinue = this.res.writeContinue;
        // this.writeEarlyHints = this.res.writeEarlyHints;
        // this.writeHead = this.res.writeHead;
        // this.writeProcessing = this.res.writeProcessing;

        // Create lowercase functions.
        this.add_trailers = this.res.addTrailers.bind(this.res);
        this.flush_headers = this.res.flushHeaders.bind(this.res);
        this.get_header = this.res.getHeader.bind(this.res);
        this.get_header_names = this.res.getHeaderNames.bind(this.res);
        this.get_headers = this.res.getHeaders.bind(this.res);
        this.has_header = this.res.hasHeader.bind(this.res);
        this.remove_header = this.res.removeHeader.bind(this.res);
        this.set_header = this.res.setHeader.bind(this.res);
        this.set_timeout = this.res.setTimeout;
        // this.write_continue = this.res.writeContinue;
        // this.write_early_hints = this.res.writeEarlyHints;
        // this.write_head = this.res.writeHead;
        // this.write_processing = this.res.writeProcessing;
    }

    // ---------------------------------------------------------
    // Functions.

    // Send a response.
    send({status = 200, headers = {}, data = null, compress = false}) {

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

        // @todo compress.
        if (compress) {
            this.res.setHeader("Content-Encoding", "deflate");
            this.res.setHeader("Vary", "Accept-Encoding");
            data = zlib.gzipSync(data, {level: zlib.constants.Z_BEST_COMPRESSION});
        }

        // Set data.
        if (data != null) {
            this.res.write(data); // do not use toString() here or it will cause issues with writing compressed data.
        }

        // Set content length.a

        // End.
        this.res.end();
    }

    // Send a response.
    success({status = 200, headers = {}, data = null, compress = false}) {
        return this.send({status: status, headers: headers, data: data, compress: compress});
    }
    error({status = 500, headers = {}, data = null, compress = false}) {
        return this.send({status: status, headers: headers, data: data, compress: compress});
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
