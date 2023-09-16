/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Imports.

const View = require(`${__dirname}/view.js`);
const zlib = require('zlib');

// ---------------------------------------------------------
// Endpoint.

/*  @docs: {
    @title: Endpoint
    @description: The endpoint class.
    @parameter: {
        @name: method
        @description: The method type.
        @type: string
    }
    @parameter: {
        @name: endpoint
        @description: The endpoint sub url.
        @type: string
    }
    @parameter: {
        @name: authenticated
        @description: Only allow authenticated requests.
        @type: string
    }
    @parameter: {
        @name: rate_limit
        @description: The maximum requests per rate limit interval. Leave `null` to disable rate limiting.
        @type: number
    }
    @parameter: {
        @name: rate_limit_interval
        @description: The rate limit interval in milliseconds.
        @type: number
    }
    @parameter: {
        @name: callback
        @description:
            The callback that will be executed when a client requests this endpoint.
            Parameter `callback` precedes over parameter `data` and parameter `view`.
            The callback can take parameters `request` and `response`.
        @type: function
    }
    @parameter: {
        @name: view
        @description:
            The javascript view that will be executed on the client side.
            Parameter `view` precedes over parameter `data`.
        @type: View, object
    }
    @parameter: {
        @name: data
        @description:
            The data that will be returned as the response body.
        @type: number, string, array, object
    }
    @parameter: {
        @name: content_type
        @description: The content type for parameter `data`.
        @type: string
    }
    @parameter: {
        @name: compress
        @description: Compress data, only available when initialized with one of the following parameters `view` or `data`.
        @type: boolean
    }
    @parameter: {
        @name: cache
        @description: 
            Parameter cache can define the max age of the cached response in seconds or as a boolean `true`. Anything higher than zero enables caching. When server production mode is enabled caching is done automatically unless `cache` is `false`. When production mode is disabled responses are never cached, even though the parameter is assigned. The response of an endpoint that uses parameter `callback` is never cached.
        @type: boolean, number
    }
 } */
class Endpoint {
    constructor({
        method = "GET",
        endpoint = "/",
        authenticated = false,
        rate_limit = null,
        rate_limit_interval = 60000,
        callback = null,
        view = null,
        data = null,
        content_type = "text/plain",
        compress = true,
        cache = null,
    }) {

        // Attributes.
        this.method = method;
        this.endpoint = endpoint;
        this.authenticated = authenticated;
        this.rate_limit = rate_limit;
        this.rate_limit_interval = rate_limit_interval;
        this.callback = callback;
        this.data = data;
        this.content_type = content_type;
        this.compress = compress !== false;
        this.cache = cache !== false;

        // Clean endpoint url.
        if (this.endpoint.charAt(0) != "/") {
            this.endpoint = "/" + this.endpoint;
        }
        this.endpoint = this.endpoint.replaceAll("//", "/");

        // Argument `view` may also be passed as an object instead of class View.
        if (view == null) {
            this.view = null;
        } else if (view instanceof View) {
            this.view = view;
        } else {
            this.view = new View(view);
        }

        // Compression enabled.
        if (this.compress) {
            if (this.data !== null) {
                this.data = zlib.gzipSync(this.data, {level: zlib.constants.Z_BEST_COMPRESSION});;
            } else if (this.view !== null) {
                this.view.html = zlib.gzipSync(this.view.html, {level: zlib.constants.Z_BEST_COMPRESSION});
            }
        }

        // Set content length.
        this.content_length = null;
        if (this.data !== null) {
            this.content_length = this.data.length;
        } else if (this.view !== null) {
            this.content_length = this.view.html.length;
        }
    }

    // Serve a client.
    _serve(request, response) {

        // Set cache headers.
        if (this.callback === null && this.cache != null && this.cache != false) {
            if (this.cache == 1) {
                response.set_header("Cache-Control", "max-age=86400");
            } else {
                response.set_header("Cache-Control", `max-age=${this.cache}`);
            }
        }

        // Set compression headers.
        if (this.callback === null && this.compress) {
            response.set_header("Content-Encoding", "gzip");
            response.set_header("Vary", "Accept-Encoding");
        }

        // Set content length.
        if (this.content_length !== null) {
            response.set_header("Content-Length", this.content_length);
        }

        response.set_cookie('TestCookie=HelloWorld; SameSite=None; HttpOnly;');

        // Callback.
        if (this.callback !== null) {
            this.callback(request, response);
        }

        // View.
        else if (this.view !== null) {
            this.view._serve(request, response);
        }

        // Data.
        else if (this.data !== null) {
            response.send({
                status: 200, 
                headers: {'Content-Type': this.content_type}, 
                data: this.data,
            });
        }

        // Undefined.
        else {
            throw new Error(`${this.method} ${this.endpoint}: Undefined behaviour, define one of the following endpoint attributes [callback, view, data].`);
        }
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = Endpoint;
