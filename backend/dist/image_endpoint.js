"use strict";
/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ---------------------------------------------------------
// Libraries.
const sharp = require('sharp');
// ---------------------------------------------------------
// Imports.
const { vlib } = require("./vinc.js");
const Endpoint = require("./endpoint.js");
// ---------------------------------------------------------
// ImageEndpoint.
// Supports resizing and editing formats.
/*  @docs:
    @nav: Backend
    @chapter: Endpoints
    @title: Image Endpoint
    @description:
        All static images are served through the `ImageEndpoint`.

        The image endpoint accepts three optional query parameters when retrieving the image to transform the image.
         - `type` string: The input type.
         - `width` number: The height of the image as a number `100` or percentage `50%` / `0.5x`. The aspect ratio will be maintained when `height` is undefined.
         - `height` number: The width of the image as a number `100` or percentage `50%` / `0.5x`. The aspect ratio will be maintained when `width` is undefined.
         - `aspect_ratio` boolean: Maintain the aspect ratio when only one resizing dimension has been defined.
 */
class ImageEndpoint extends Endpoint {
    // Constructr.
    constructor({ endpoint = null, path = null, content_type = null, cache = true, _is_static = true, }) {
        // Initialize base.
        super({
            method: "GET",
            endpoint,
            content_type,
            compress: false,
            cache: cache,
            params: {
                "type": { type: "string", default: null },
                "width": { type: ["number", "string"], default: null },
                "height": { type: ["number", "string"], default: null },
                "aspect_ratio": { type: "string", default: null },
            },
            _path: path.str(),
            _is_static,
        });
        // Attributes.
        this.i_path = path.abs();
        this.i_type = this.i_path.extension().substr(1);
        if (ImageEndpoint.cache_in_memory) {
            this.i_data = this.i_path.load_sync({ type: null });
            this.i_cache = new Map();
        }
        // Attribute for Endpoint.
        this.is_image_endpoint = true;
        // Assign callback.
        this.callback = (stream, params) => __awaiter(this, void 0, void 0, function* () {
            // No params.
            if ((params.type == null || this.i_type === params.type) &&
                params.width == null &&
                params.height == null) {
                return stream.send({
                    status: 200,
                    data: ImageEndpoint.cache_in_memory ? this.i_data : this.i_path.load_sync({ type: null }),
                });
            }
            // Remove type from params when same as original type.
            if (this.i_type === params.type) {
                params.type = null;
            }
            // Check cache.
            let cache_id;
            if (ImageEndpoint.cache_in_memory) {
                const cache_id = `${params.width == null ? "" : params.width}.${params.height == null ? "" : params.height}.${params.type == null ? "" : params.type}`;
                if (this.i_cache.has(cache_id)) {
                    return stream.send({
                        status: 200,
                        data: this.i_cache.get(cache_id),
                    });
                }
            }
            // Transform image.
            const data = yield this.transform(params.type, params.width, params.height, params.aspect_ratio);
            if (ImageEndpoint.cache_in_memory) {
                this.i_cache.set(cache_id, data);
            }
            return stream.send({
                status: 200,
                data,
            });
        });
    }
    // Transform image.
    transform() {
        return __awaiter(this, arguments, void 0, function* (type = null, width = null, height = null, aspect_ratio = true) {
            const img = yield sharp(this.i_path.str());
            let metadata;
            if (width != null || height != null) {
                if (typeof width === "string") {
                    let last_char = width.charAt(width.length - 1);
                    if (last_char === "%" || last_char === "x") {
                        if (metadata === undefined) {
                            metadata = yield img.metadata();
                        }
                        if (last_char === "x") {
                            width = parseInt(metadata.width * parseFloat(width));
                        }
                        else {
                            width = parseInt(metadata.width * (parseFloat(width) / 100));
                        }
                    }
                    else {
                        width = parseInt(width);
                    }
                }
                else if (typeof width === "number") {
                    width = parseInt(width);
                }
                if (typeof height === "string") {
                    let last_char = height.charAt(height.length - 1);
                    if (last_char === "%" || last_char === "x") {
                        if (metadata === undefined) {
                            metadata = yield img.metadata();
                        }
                        if (last_char === "x") {
                            height = parseInt(metadata.height * parseFloat(height));
                        }
                        else {
                            height = parseInt(metadata.height * (parseFloat(height) / 100));
                        }
                    }
                    else {
                        height = parseInt(height);
                    }
                }
                else if (typeof height === "number") {
                    height = parseInt(height);
                }
                const opts = { width, height };
                if (aspect_ratio === "false" || aspect_ratio === false) {
                    opts.fit = 'fill';
                }
                img.resize(opts);
            }
            if (type != null) {
                img.toFormat(type);
            }
            return img.toBuffer();
        });
    }
    // Get aspect ratio.
    get_aspect_ratio() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const metadata = yield sharp(this._path).metadata();
                // console.log(this.endpoint, `${metadata.width} / ${metadata.height}`);
                return `${metadata.width} / ${metadata.height}`;
            }
            catch (err) {
                console.error(`Unable to determine the aspect ratio of image ${this._path}:`, err);
                // throw err;
                return null;
            }
        });
    }
    // Clear cache.
    _clear_cache() {
        if (ImageEndpoint.cache_in_memory) {
            this.i_cache.clear();
        }
    }
}
// Cache the original and transformed image data in memory.
ImageEndpoint.cache_in_memory = false;
// Supported image extensions.
ImageEndpoint.supported_images = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".tif",
    ".tiff",
    ".svg",
    ".heif",
    ".avif"
];
// ---------------------------------------------------------
// Exports.
module.exports = ImageEndpoint;
