/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Libraries.

const {vhighlight} = require("./vinc.js");

// ---------------------------------------------------------
// Imports.

const Meta = require(`${__dirname}/meta.js`);

// ---------------------------------------------------------
// View.
// @todo add template vars for callback and css and js include files. 
// @todo add optional background to default html body.
/*  @docs:
 *  @nav: Backend
 *  @title: View
 *  @description: The js view class.
 *  @parameter:
 *      @name: source
 *      @description: The static url to the client side javascript source code.
 *      @type: string
 *  @parameter:
 *      @name: callback
 *      @description: The client side callback function, this function will be executed at the client side. For this feature the `Content-Security-Policy:script-src` must be updated with for example `unsafe-inline`.
 *      @type: function
 *  @parameter:
 *      @name: includes
 *      @description: The included static js files.
 *      @type: array[string]
 *  @parameter:
 *      @name: links
 *      @description: The included static css files.
 *      @type: array[string], array[LinkObject]
 *      @attributes_type: LinkObject
 *      @attribute:
 *          @name: href
 *          @description: The source url of the link to include.
 *          @type: string
 *          @required: true
 *      @attribute:
 *          @name: rel
 *          @description: The source url of the link to include.
 *          @type: string
 *          @required: false
 *          @def: stylesheet
 *  @parameter:
 *      @name: meta
 *      @description: The meta information object.
 *      @type: Meta
 *  @parameter:
 *      @name: jquery
 *      @description: Include jqeury by default.
 *      @type: boolean
 *  @parameter:
 *      @name: compression
 *      @description: Include the vweb compression module.
 *      @type: boolean
 *  @parameter:
 *      @name: payments
 *      @description: Include external payment sources, should be enabled on the checkout page.
 *      @type: boolean
 *  @parameter:
 *      @name: vhighlight
 *      @description: Include vhighlight by default.
 *      @type: boolean
 *  @parameter:
 *      @name: background
 *      @description: The background color of the body.
 *      @type: string
 *  @parameter:
 *      @name: _src
 *      @ignore: true
 */
class View {

    // Global settings.
    static includes = [];
    static links = [];
    static background = null; // css background color.
    static body_style = null; // css string style.

    // Constructor.
    constructor({
        source = null,
        callback = null,
        includes = [],
        links = [],
        meta = null,
        jquery = true,
        compression = false,
        payments = false,
        vhighlight = false,
        lang = "en",
        background = null,
        body_style = null,
        splash_screen = null,
        _src = __filename,
    }) {

        // Arguments.
        this.source = source;
        this.callback = callback;
        this.includes = [...View.includes, ...includes];
        this.links = [...View.links, ...links];
        this.meta = meta;
        this.jquery = jquery;
        this.compression = compression;
        this.payments = payments;
        this.vhighlight = vhighlight;
        this.lang = lang;
        this.background = background || View.background;
        this.body_style = body_style || View.body_style;
        this.splash_screen = splash_screen;

        // System arguments.
        this._src = _src;

        // Check args.
        if (typeof source !== "string" && typeof callback !== "function") {
            throw Error("Invalid usage, define either parameter \"source\" or \"callback\".");
        }

        // Attributes.
        this.html = null;
    }

    // Build html.
    _build_html(server) {

        // Initialize html.
        this.html = "";

        // Doctype.
        this.html += `<!DOCTYPE html><html style='min-width:100%;min-height:100%;' lang='${this.lang}'>`;
        
        // Headers.
        this.html += `<head>`;
        
        // Default meta data.
        this.html += `<meta charset='${this.meta.charset}'>`;
        this.html += `<meta name='viewport' content='${this.meta.viewport}'/>`;
        
        // Meta author.
        this.html += `<meta name='author' content='${this.meta.author}'/>`;
        
        // Meta title.
        this.html += `<title>${this.meta.title}</title>`;
        this.html += `<meta property='og::title' content='${this.meta.title}'/>`;
        this.html += `<meta property='twitter::title' content='${this.meta.title}'/>`;
        
        // Meta description.
        this.html += `<meta name='description' content='${this.meta.description}'/>`;
        this.html += `<meta property='og::description' content='${this.meta.description}'/>`;
        
        // Meta image.
        this.html += `<meta property='og::image' content='${this.meta.image}'/>`;
        
        // Meta robots.
        this.html += `<meta name='robots' content='${this.meta.robots}'>`;
        
        // Favicon.
        this.html += `<link rel='icon' href='${this.meta.favicon}' type='image/x-icon'/>`;

        // Stylesheets.
        this.html += `<link rel="preload" href="/vweb/vweb.css" as="style" onload="this.onload=null;this.rel='stylesheet'">`
        this.html += `<noscript><link rel="stylesheet" href="/vweb/vweb.css"></noscript>`
        if (this.vhighlight) {
            // this.html += '<link async rel="stylesheet" href="/vhighlight/vhighlight.css">';
            this.html += `<link rel="preload" href="/vhighlight/vhighlight.css" as="style" onload="this.onload=null;this.rel='stylesheet'">`
            this.html += `<noscript><link rel="stylesheet" href="/vhighlight/vhighlight.css"></noscript>`

        }
        if (this.payments && server.payments) {
            if (server.payments.type === "adyen") {
                this.html += `<link rel="stylesheet" href="https://checkoutshopper-${server.production ? "live" : "test"}.adyen.com/checkoutshopper/sdk/5.53.2/adyen.css" integrity="sha384-9EdBqZRrjozkt+Be5ycjHBTi+4DYrafpC1KyPnNyTBfjBIZ5+oMp8BbgvPLGgsE0" crossorigin="anonymous">`
                this.html += `<link rel="stylesheet" href="/vweb/payments/adyen.css"></script>`;
            }
        }
        this.links.iterate((url) => {
            if (typeof url === "string") {
                this.html += `<link rel="stylesheet" href="${url}">`;
            } else if (typeof url === "object") {
                if (url.rel == null) {
                    url.rel = "stylesheet";
                }
                this.html += "<link";
                Object.keys(url).iterate((key) => {
                    this.html += ` ${key}="${url[key]}"`;
                })
                this.html += ">";
            } else {
                throw Error("Invalid type for a css include, the valid value types are \"string\" and \"object\".");
            }
        })
        
        // End headers.
        this.html += "</head>";

        // Body.
        this.html +=  "<body id='body' style='width:100%;height:100%;margin:0;padding:0;";
        if (this.background != null) { this.html += `background:${this.background};` }
        if (this.body_style != null) { this.html += this.body_style}
        this.html += "'>";

        // Create splash screen.
        if (true || this.splash_screen != null) {

            // HTML code.
            if (typeof this.splash_screen === "string") {
                this.html += splash_screen;
            }

            // Object configuration.
            else {
                this.html += "<style>" +
                ".lds-ring {" +
                "  display: inline-block;" +
                "  position: relative;" +
                "  width: calc(80px / 2);" +
                "  height: calc(80px / 2);" +
                "}" +
                ".lds-ring div {" +
                "  box-sizing: border-box;" +
                "  display: block;" +
                "  position: absolute;" +
                "  width: calc(64px / 2);" +
                "  height: calc(64px / 2);" +
                "  margin: calc(8px / 2);" +
                "  border: calc(8px / 2) solid #fff;" +
                "  border-radius: 50%;" +
                "  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;" +
                "  border-color: #fff transparent transparent transparent;" +
                "}" +
                ".lds-ring div:nth-child(1) {" +
                "  animation-delay: -0.45s;" +
                "}" +
                ".lds-ring div:nth-child(2) {" +
                "  animation-delay: -0.3s;" +
                "}" +
                ".lds-ring div:nth-child(3) {" +
                "  animation-delay: -0.15s;" +
                "}" +
                "@keyframes lds-ring {" +
                "  0% {" +
                "    transform: rotate(0deg);" +
                "  }" +
                "  100% {" +
                "    transform: rotate(360deg);" +
                "  }" +
                "}</style>" +
                "<div id='splash_screen' style='width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;'>" +
                "<div style='display: block;'>" +
                "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>" +
                "</div>" +
                "</div>"
            }
        }

        // Close body.
        this.html += "</body>";

        // JS includes.
        this.html += "<script src='/vweb/vweb.js'></script>";
        if (this.vhighlight) {
            this.html += "<script src='/vhighlight/vhighlight.js'></script>";
        }
        if (this.jquery) {
            this.html += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js'></script>";
        }
        if (server.payments) {
            if (server.payments.type === "adyen") {
                this.html += "<script src='/vweb/payments/adyen.js'></script>";
                if (this.payments) {
                    this.html += `<script>vweb.payments.include_started = true;</script>`
                    this.html += `<script defer src="https://checkoutshopper-${server.production ? "live" : "test"}.adyen.com/checkoutshopper/sdk/5.53.2/adyen.js" integrity="sha384-ng3HLoZIlQ3BLgyGyGNiwWSx6LEPIlmxVuGRw72skZFt9mL8OweRjp7vcPzSqxTj" crossorigin="anonymous" onload="vweb.payments.include_finished = true;"></script>`
                }
            } else if (server.payments.type === "paddle") {
                this.html += "<script src='/vweb/payments/paddle.js'></script>";
                if (this.payments) {
                    this.html += "<script src='https://cdn.paddle.com/paddle/v2/paddle.js'></script>";
                    // this.html += `<script>if(vweb.payments==null){vweb.payments={}};vweb.payments.include_started = true;</script>`
                    // this.html += "<script src='https://cdn.paddle.com/paddle/v2/paddle.js' onload='vweb.payments.include_finished = true;'></script>";
                }
            }
        }
        if (server.google_tag !== undefined) {
            this.html += `<script defer src="https://www.googletagmanager.com/gtag/js?id=${server.google_tag}"></script>`;
        }
        this.includes.iterate((url) => {
            if (typeof url === "string") {
                this.html += `<script src='${url}'></script>`;
            } else if (typeof url === "object") {
                this.html += "<script";
                Object.keys(url).iterate((key) => {
                    this.html += ` ${key}="${url[key]}"`;
                })
                this.html += "></script>";
            } else {
                throw Error("Invalid type for a js include, the valid value types are \"string\" and \"object\".");
            }
        })

        // Load the srouce.
        if (typeof this.source === "string") {
            this.html += `<script src='${this.source}'></script>`;
        }

        // JS code.
        else if (this.callback !== null) {
            let code = this.callback.toString();
            const compiler = new vhighlight.JSCompiler({
                line_breaks: true,
                double_line_breaks: false,
                comments: false,
                white_space: false,
            })
            try {
                code = compiler.compile_code(code, this._src);
            } catch (err) {
                console.error("JS Compile error:");
                console.error(err);
            }
            this.html +=  `<script>(${code})()</script>`;
        }
        
        // End.
        this.html +=  "</html>";

    }

    // Serve a client.
    _serve(request, response) {
        response.send({
            status: 200, 
            headers: {"Content-Type": "text/html"}, 
            data: this.html,
        });
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = View;
