/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Imports.

const View = require(`${__dirname}/view.js`);
const zlib = require('zlib');
const {vlib} = require("./vinc.js");
const utils = require("./utils.js");
const Status = require("./status.js");
const {FrontendError} = utils;

// ---------------------------------------------------------
// Endpoint.

/*  @docs:
 *  @nav: Backend
    @title: Endpoint
    @description: The endpoint class.
    @parameter:
        @name: method
        @description: The method type.
        @type: string
    @parameter:
        @name: endpoint
        @description: The endpoint sub url.
        @type: string
    @parameter:
        @name: authenticated
        @description: Only allow authenticated requests.
        @type: string
    @parameter:
        @name: rate_limit
        @description: The maximum requests per rate limit interval. Leave `null` to disable rate limiting.
        @type: number
    @parameter:
        @name: rate_limit_interval
        @description: The rate limit interval in milliseconds.
        @type: number
    @parameter:
        @name: callback
        @description:
            The callback that will be executed when a client requests this endpoint.
            Parameter `callback` precedes over parameter `data` and parameter `view`.
            The callback can take parameters `request` and `response`.
        @type: function
    @parameter:
        @name: view
        @description:
            The javascript view that will be executed on the client side.
            Parameter `view` precedes over parameter `data`.
        @type: View, object
    @parameter:
        @name: data
        @description:
            The data that will be returned as the response body.
        @type: number, string, array, object
    @parameter:
        @name: content_type
        @description: The content type for parameter `data` or `callback`.
        @type: string
    @parameter:
        @name: compress
        @description: Compress data, only available when initialized with one of the following parameters `view` or `data`.
        @type: boolean
    @parameter:
        @name: cache
        @description: 
            Parameter cache can define the max age of the cached response in seconds or as a boolean `true`. Anything higher than zero enables caching. When server production mode is enabled caching is done automatically unless `cache` is `false`. When production mode is disabled responses are never cached, even though the parameter is assigned. The response of an endpoint that uses parameter `callback` is never cached.
        @type: boolean, number
    @parameter:
        @name: _path
        @ignore: true
 */
class Endpoint {
    constructor({
        method = "GET",
        endpoint = "/",
        authenticated = false,
        rate_limit = null,
        rate_limit_interval = 60000,
        params = null,
        callback = null,
        view = null,
        data = null,
        content_type = "text/plain",
        compress = true,
        cache = null,
        _path = null,
    }) {

        // Attributes.
        this.method = method;
        this.endpoint = endpoint;
        this.authenticated = authenticated;
        this.rate_limit = rate_limit;
        this.rate_limit_interval = rate_limit_interval;
        this.params = params;
        this.callback = callback;
        this.data = data;
        this.content_type = content_type;
        this.compress = compress !== false;
        this.cache = cache !== false;
        this._path = _path; // is automatically assigned for static files.

        // Clean endpoint url.
        if (this.endpoint.charAt(0) != "/") {
            this.endpoint = "/" + this.endpoint;
        }
        this.endpoint = this.endpoint.replaceAll("//", "/");
        if (this.endpoint.length > 1 && this.endpoint.charAt(this.endpoint.length - 1) === "/") {
            this.endpoint = this.endpoint.substr(0, this.endpoint.length - 1);
        }

        // Argument `view` may also be passed as an object instead of class View.
        if (view == null) {
            this.view = null;
        } else if (view instanceof View) {
            this.view = view;
        } else {
            this.view = new View(view);
        }

        // The endpoint parent for params verification.
        this._verify_params_parent = this.endpoint + ":";
    }

    // Initialize.
    _initialize(server) {

        // Build html code of view.
        if (this.view !== null) {
            this.view._build_html(server);
        }

        // Compression enabled.
        if (this.callback == null && this.compress) {
            this._is_compressed = true;
            if (this.data !== null) {
                this.data = zlib.gzipSync(this.data, {level: zlib.constants.Z_BEST_COMPRESSION});;
            } else if (this.view !== null) {
                this.view.html = zlib.gzipSync(this.view.html, {level: zlib.constants.Z_BEST_COMPRESSION});
            }
            // const is_compressed = (data) => {
            //     // Check if the first two bytes match the zlib compression header
            //     if (data[0] === 0x78 && (data[1] === 0x01 || data[1] === 0x9C || data[1] === 0xDA)) {
            //         return true;
            //     }

            //     // Check png.
            //     let is_png = true;
            //     const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
            //     for (let i = 0; i < pngSignature.length; i++) {
            //         if (data[i] !== pngSignature[i]) {
            //             is_png = false;
            //             break;
            //         }
            //     }
            //     if (is_png) { return true; }
                
            //     // Check for the JPEG SOI (Start of Image) marker
            //     return data[0] === 0xFF && data[1] === 0xD8;
            // }
            /* is_compressed(this.data) === false */
        }

        // Set content length.
        // this.content_length = null;
        // if (this.data !== null) {
        //     this.content_length = this.data.length;
        // }
        // else if (this.view !== null) {
        //     this.content_length = this.view.html.length;
        // }
    }

    // Serve a client.
    async _serve(request, response) {
        return new Promise(async (resolve, reject) => {

            // Set cache headers.
            if (this.callback === null && this.cache != null && this.cache != false) {
                if (this.cache == 1) {
                    response.set_header("Cache-Control", "max-age=86400");
                } else {
                    response.set_header("Cache-Control", `max-age=${this.cache}`);
                }
            }

            // Set compression headers.
            if (this._is_compressed) {
                response.set_header("Content-Encoding", "gzip");
                response.set_header("Vary", "Accept-Encoding");
            }

            // Set content length.
            if (this.content_length != null) {
                response.set_header("Content-Length", this.content_length);
            }

            // Set content type.
            if (this.content_type != null) {
                response.set_header("Content-Type", this.content_type);
            }

            // Callback.
            if (this.callback !== null) {
                if (this.params != null) {
                    const {error, invalid_fields} = vlib.utils.verify_params({
                        params: request.params, 
                        info: this.params, 
                        check_unknown: true, 
                        parent: this._verify_params_parent, 
                        throw_err: false,
                    });
                    if (error) {
                        response.send({
                            status: Status.bad_request, 
                            headers: {"Content-Type": "application/json"},
                            data: {
                                error,
                                invalid_fields,
                            }
                        });
                        return resolve();
                    }
                }
                try {
                    let promise;
                    if (this.params != null) {
                        promise = this.callback(request, response, request.params);
                    } else {
                        promise = this.callback(request, response);
                    }
                    if (promise instanceof Promise) {
                        await promise;
                    }
                } catch (err) {
                    console.error(err)
                    response.send({
                        status: err instanceof FrontendError && err.status != null ? err.status : Status.internal_server_error, 
                        headers: {"Content-Type": "application/json"},
                        data: {error: err instanceof FrontendError ? err.message : "Internal Server Error"},
                    });
                    utils.error(`${this.method}:${this.endpoint}: `, err); // after sending the response since this edits the error.
                }
                return resolve();
            }

            // View.
            else if (this.view !== null) {
                this.view._serve(request, response);
                return resolve();
            }

            // Data.
            else if (this.data !== null) {
                response.send({
                    status: 200, 
                    data: this.data,
                });
                return resolve();
            }

            // Undefined.
            else {
                return reject(`${this.method} ${this.endpoint}: Undefined behaviour, define one of the following endpoint attributes [callback, view, data].`);
            }
        })
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = Endpoint;
