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
/*  @docs: {
    @title: View
    @description: The js view class.
    @parameter: {
        @name: callback
        @description: The client side callback function, this function will be executed at the client side.
        @type: function
    }
    @parameter: {
        @name: includes
        @description: The included static js files.
        @type: array[string]
    }
    @parameter: {
        @name: css_includes
        @description: The included static css files.
        @type: array[string]
    }
    @parameter: {
        @name: meta
        @description: The meta information object.
        @type: Meta
    }
    @parameter: {
        @name: jquery
        @description: Include jqeury by default.
        @type: boolean
    }
    @parameter: {
        @name: vhighlight
        @description: Include vhighlight by default.
        @type: boolean
    }
 } */
class View {
    constructor({
        callback = null,
        includes = [],
        css_includes = [],
        meta = new Meta(),
        jquery = true,
        vhighlight = false,
    }) {

        // Arguments.
        this.callback = callback;
        this.includes = includes;
        this.css_includes = css_includes;
        this.meta = meta;
        this.jquery = jquery;
        this.vhighlight = vhighlight;

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
        this.html += `<meta charset='${this.meta.charset}'>\n`;
        this.html += `<meta name='viewport' content='${this.meta.viewport}' />\n`;
        
        // Meta author.
        this.html += `<meta name='author' content='${this.meta.author}' />\n`;
        
        // Meta title.
        this.html += `<title>${this.meta.title}</title>\n`;
        this.html += `<meta property='og::title' content='${this.meta.title}' />\n`;
        this.html += `<meta property='twitter::title' content='${this.meta.title}' />\n`;
        
        // Meta description.
        this.html += `<meta name='description' content='${this.meta.description}' />\n`;
        this.html += `<meta property='og::description' content='${this.meta.description}' />\n`;
        
        // Meta image.
        this.html += `<meta property='og::image' content='${this.meta.image}' />\n`;
        
        // Meta robots.
        this.html += `<meta name='robots' content='${this.meta.robots}'>\n`;
        
        // Favicon.
        this.html += `<link rel='icon' href='${this.meta.favicon}' type='image/x-icon' />\n`;

        // Stylesheets.
        this.html += '<link rel="stylesheet" href="/vweb/vweb.css">\n';
        if (this.vhighlight) {
            this.html += '<link rel="stylesheet" href="/vhighlight/vhighlight.css">\n';
        }
        this.css_includes.iterate((url) => {
            this.html += `<link rel="stylesheet" href="${url}">\n`;
        })
        
        // End headers.
        this.html += "</head>\n";

        // JS includes.
        this.html += "<script src='/vweb/vweb.js'></script>\n";
        if (this.vhighlight) {
            this.html += "<script src='/vhighlight/vhighlight.js'></script>\n";
        }
        if (this.jquery) {
            this.html += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js'></script>\n";
        }
        this.includes.iterate((url) => {
            this.html += `<script src='${url}'></script>\n`;
        })

        // JS code.
        if (this.callback !== null) {
            let code = this.callback.toString();
            const compiler = new vhighlight.JSCompiler({
                line_breaks: true,
                double_line_breaks: false,
                comments: false,
                white_space: false,
            })
            code = compiler.compile_code(code);
            this.html +=  `<script>(${code})()</script>\n`;
        }
        
        // Body.
        this.html +=  "<body id='body'></body>\n";
        
        // End.
        this.html +=  "</html>\n";

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
