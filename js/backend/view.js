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
/*  @docs: {
 *  @chapter: Backend
 *  @title: View
 *  @description: The js view class.
 *  @parameter: {
 *      @name: source
 *      @description: The static url to the client side javascript source code.
 *      @type: string
 *  }
 *  @parameter: {
 *      @name: callback
 *      @description: The client side callback function, this function will be executed at the client side.
 *      @type: function
 *  }
 *  @parameter: {
 *      @name: includes
 *      @description: The included static js files.
 *      @type: array[string]
 *  }
 *  @parameter: {
 *      @name: css_includes
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
 *  }
 *  @parameter: {
 *      @name: meta
 *      @description: The meta information object.
 *      @type: Meta
 *  }
 *  @parameter: {
 *      @name: jquery
 *      @description: Include jqeury by default.
 *      @type: boolean
 *  }
 *  @parameter: {
 *      @name: vhighlight
 *      @description: Include vhighlight by default.
 *      @type: boolean
 *  }
 *  @parameter: {
 *      @name: payments
 *      @description: Include the vweb.payments library in the view.
 *      @type: boolean
 *  }
 *  @parameter: {
 *      @name: background
 *      @description: The background color of the body.
 *      @type: string
 *  }
 */
class View {
    constructor({
        source = null,
        callback = null,
        includes = [],
        css_includes = [],
        meta = new Meta(),
        jquery = true,
        vhighlight = false,
        payments = false,
        background = "white",
        _src = __filename,
    }) {

        // Arguments.
        this.source = source;
        this.callback = callback;
        this.includes = includes;
        this.css_includes = css_includes;
        this.meta = meta;
        this.jquery = jquery;
        this.vhighlight = vhighlight;
        this.payments = payments;
        this.background = background;

        // System arguments.
        this._src = _src;

        // Check args.
        if (typeof source !== "string" && typeof callback !== "function") {
            throw Error("Invalid usage, define either parameter \"source\" or \"callback\".");
        }

        // Attributes.
        this.html = null;

        // Build html.
        this.build_html();
    }

    // Build html.
    build_html() {

        // Initialize html.
        this.html = "";

        // Doctype.
        this.html += "<!DOCTYPE html><html>";
        
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
        this.html += '<link rel="stylesheet" href="/vweb/vweb.css">';
        if (this.vhighlight) {
            this.html += '<link rel="stylesheet" href="/vhighlight/vhighlight.css">';
        }
        this.css_includes.iterate((url) => {
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
        if (this.payments) {
            this.html += `<link rel="stylesheet" href="https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/5.51.0/adyen.css" integrity="sha384-k6qYnmoHaucEm97eQQAs3MK5e44JQ2sksrue2tfdDOnnedKzc0VYQwxzdYWZu8Mj" crossorigin="anonymous">`;
        }
        
        // End headers.
        this.html += "</head>";

        // Body.
        this.html +=  `<body id='body' style='background: ${this.background}'></body>`;

        // JS includes.
        this.html += "<script src='/vweb/vweb.js'></script>";
        if (this.vhighlight) {
            this.html += "<script src='/vhighlight/vhighlight.js'></script>";
        }
        if (this.jquery) {
            this.html += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js'></script>";
        }
        if (this.payments) {
            // this.html += "<script async src='https://js.stripe.com/v3/'></script>";
            this.html += `<script async src="https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/5.51.0/adyen.js" integrity="sha384-FJWX32BY0zx3KKed9gdiWxoEAEsA3uh1ixchmdkflgtcDo+SoYg5ZD6uqvDmnafO" crossorigin="anonymous"></script>`
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
