/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Libraries.

const https = require("https");
const libfs = require("fs");
const libpath = require("path")

// ---------------------------------------------------------
// Imports.

const Endpoint = require(`${__dirname}/endpoint.js`);
const Response = require(`${__dirname}/response.js`);

// ---------------------------------------------------------
// The server object.

/*  @docs: {
    @title: Meta
    @description: The js view meta information class.
    @parameter: {
        @name: ip
        @description: The ip where the server will run on.
        @type: string
    }
    @parameter: {
        @name: port
        @description: The port where the server will run on.
        @type: string
    }
    @parameter: {
        @name: certificate
        @description: The path to the certificate file.
        @type: string
    }
    @parameter: {
        @name: private_key
        @description: The path to the private key file.
        @type: string
    }
    @parameter: {
        @name: passphrase
        @description: The passphrase of the private key.
        @type: string
    }
    @parameter: {
        @name: statics
        @description: Array with path's to static directories.
        @type: array[string]
    }
    @parameter: {
        @name: production
        @description: Whether the server is in production more, or in development mode.
        @type: bool
    }
 } */
class Server {
    constructor({
        ip = "127.0.0.1",
        port = 8000,
        certificate = '../dev/tls/certificate.pem',
        private_key = '../dev/tls/private-key.pem',
        passphrase = "Doeman12!",
        statics = [],
        production = false,
    }) {

        // Attributes.
        this.port = port;
        this.ip = ip;
        this.certificate = libfs.readFileSync(certificate, 'utf8');
        this.private_key = libfs.readFileSync(private_key, 'utf8');
        this.statics = statics;
        this.production = production;

        // Define your list of endpoints
        this.endpoints = [];
        
        // Create an HTTPS server
        this.https = https.createServer({key: this.private_key, cert: this.certificate, passphrase: passphrase}, (request, response) => this.serve(request, response));

        // Mimes for content type detection.
        // Must be defined before creating static endpoints.
        this.content_type_mimes = [
            ["html", "text/html"],
            ["htm", "text/html"],
            ["shtml", "text/html"],
            ["css", "text/css"],
            ["xml", "application/xml"],
            ["gif", "image/gif"],
            ["jpeg", "image/jpeg"],
            ["jpg", "image/jpeg"],
            ["js", "application/javascript"],
            ["atom", "application/atom+xml"],
            ["rss", "application/rss+xml"],
            ["mml", "text/mathml"],
            ["txt", "text/plain"],
            ["jad", "text/vnd.sun.j2me.app-descriptor"],
            ["wml", "text/vnd.wap.wml"],
            ["htc", "text/x-component"],
            ["png", "image/png"],
            ["tif", "image/tiff"],
            ["tiff", "image/tiff"],
            ["wbmp", "image/vnd.wap.wbmp"],
            ["ico", "image/x-icon"],
            ["jng", "image/x-jng"],
            ["bmp", "image/x-ms-bmp"],
            ["svg", "image/svg+xml"],
            ["svgz", "image/svg+xml"],
            ["webp", "image/webp"],
            ["woff", "font/woff"],
            ["woff2", "font/woff2"],
            ["jar", "application/java-archive"],
            ["war", "application/java-archive"],
            ["ear", "application/java-archive"],
            ["json", "application/json"],
            ["hqx", "application/mac-binhex40"],
            ["doc", "application/msword"],
            ["pdf", "application/pdf"],
            ["ps", "application/postscript"],
            ["eps", "application/postscript"],
            ["ai", "application/postscript"],
            ["rtf", "application/rtf"],
            ["m3u8", "application/vnd.apple.mpegurl"],
            ["xls", "application/vnd.ms-excel"],
            ["eot", "application/vnd.ms-fontobject"],
            ["ppt", "application/vnd.ms-powerpoint"],
            ["wmlc", "application/vnd.wap.wmlc"],
            ["kml", "application/vnd.google-earth.kml+xml"],
            ["kmz", "application/vnd.google-earth.kmz"],
            ["7z", "application/x-7z-compressed"],
            ["cco", "application/x-cocoa"],
            ["jardiff", "application/x-java-archive-diff"],
            ["jnlp", "application/x-java-jnlp-file"],
            ["run", "application/x-makeself"],
            ["pl", "application/x-perl"],
            ["pm", "application/x-perl"],
            ["prc", "application/x-pilot"],
            ["pdb", "application/x-pilot"],
            ["rar", "application/x-rar-compressed"],
            ["rpm", "application/x-redhat-package-manager"],
            ["sea", "application/x-sea"],
            ["swf", "application/x-shockwave-flash"],
            ["sit", "application/x-stuffit"],
            ["tcl", "application/x-tcl"],
            ["tk", "application/x-tcl"],
            ["der", "application/x-x509-ca-cert"],
            ["pem", "application/x-x509-ca-cert"],
            ["crt", "application/x-x509-ca-cert"],
            ["xpi", "application/x-xpinstall"],
            ["xhtml", "application/xhtml+xml"],
            ["xspf", "application/xspf+xml"],
            ["zip", "application/zip"],
            ["bin", "application/octet-stream"],
            ["exe", "application/octet-stream"],
            ["dll", "application/octet-stream"],
            ["deb", "application/octet-stream"],
            ["dmg", "application/octet-stream"],
            ["iso", "application/octet-stream"],
            ["img", "application/octet-stream"],
            ["msi", "application/octet-stream"],
            ["msp", "application/octet-stream"],
            ["msm", "application/octet-stream"],
            ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
            ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
            ["mid", "audio/midi"],
            ["midi", "audio/midi"],
            ["kar", "audio/midi"],
            ["mp3", "audio/mpeg"],
            ["ogg", "audio/ogg"],
            ["m4a", "audio/x-m4a"],
            ["ra", "audio/x-realaudio"],
            ["3gpp", "video/3gpp"],
            ["3gp", "video/3gpp"],
            ["ts", "video/mp2t"],
            ["mp4", "video/mp4"],
            ["mpeg", "video/mpeg"],
            ["mpg", "video/mpeg"],
            ["mov", "video/quicktime"],
            ["webm", "video/webm"],
            ["flv", "video/x-flv"],
            ["m4v", "video/x-m4v"],
            ["mng", "video/x-mng"],
            ["asx", "video/x-ms-asf"],
            ["asf", "video/x-ms-asf"],
            ["wmv", "video/x-ms-wmv"],
            ["avi", "video/x-msvideo"],
        ];

        // Create endpoints.
        this.create_default_endpoints();
        this.statics.iterate((path) => {
            this.create_static_endpoints(libpath.dirname(path), path);
        });

    }

    // ---------------------------------------------------------
    // Utils.

    // Get a content type from an extension.
    get_content_type(extension) {
        let content_type = this.content_type_mimes.iterate((item) => {
            if (item[0] == extension) {
                return item[1];
            }
        })
        if (content_type == null) {
            content_type = "application/octet-stream";
        }
        return content_type;
    }

    // ---------------------------------------------------------
    // Server.

    // Start the server.
    start() {
        this.https.listen(this.port, this.ip, () => {
            console.log(`Running on ${this.ip}:${this.port}.`);
        });
        this.https.on("error", (err) => {
            console.error("Server error:", err);
        });
    }

    // Serve a client.
    serve(request, response) {
        response = new Response(response);

        // Parse the request method and URL
        const { method, url } = request;
        console.log(`${Date.now()}: ${method} ${url}.`);

        // Check if the request matches any of the defined endpoints
        const endpoint = this.endpoints.find((endpoint) => {
            return endpoint.method === method && endpoint.endpoint === url;
        });

        // No endpoint found.
        if (!endpoint) {
            response.send({
                status: 404, 
                headers: {"Content-Type": "text/plain"},
                data: "Not Found",
            });
            return null;
        }

        // Serve endpoint.
        try {
            endpoint.serve(request, response);
        } catch (err) {
            console.error(`${method} ${url}: Internal Server Error.`);
            console.error(err);
            response.send({
                status: 500, 
                headers: {"Content-Type": "text/plain"},
                data: "Internal Server Error",
            });
            return null;   
        }

        // Check if the response has been sent.
        if (!response.finished) {
            console.error(`${method} ${url}: Unfinished response.`);
            response.send({
                status: 500, 
                headers: {"Content-Type": "text/plain"},
                data: "Internal Server Error",
            });
        }
    }

    // ---------------------------------------------------------
    // Endpoints.

    // Add an endpoint.
    endpoint(endpoint = {}) {
        if (endpoint instanceof Endpoint) {
            this.endpoints.push(endpoint);
        } else {
            this.endpoints.push(new Endpoint(endpoint));
        }
        return this;
    }

    // Create static endpoints.
    create_static_endpoints(base, dir) {
        const files = libfs.readdirSync(dir);
        files.iterate((name) => {

            // Join path.
            const path = libpath.join(dir, name);

            // Read dir recursively.
            if (libfs.statSync(path).isDirectory()) {
                this.create_static_endpoints(base, path);
            }

            // Add file.
            else {
                const subpath = path.substr(base.length)
                if (subpath.charAt(0) != "/") {
                    subpath = "/" + subpath;
                }
                this.endpoint(new Endpoint({
                    method: "GET",
                    endpoint: subpath,
                    data: libfs.readFileSync(path/*, 'utf8'*/),
                    content_type: this.get_content_type(libpath.extname(path))
                }))
            }
        })
    }

    // Create default endpoints.
    create_default_endpoints() {
        const defaults = [
            {
                method: "GET",
                endpoint: "/vweb/vweb.css",
                content_type: "text/css",
                path: `${__dirname}/../../include/vweb/ui/css/vweb.css`,
            },
            {
                method: "GET",
                endpoint: "/vweb/vhighlight.css",
                content_type: "text/css",
                path: `${__dirname}/../../include/vweb/ui/css/vhighlight.css`,
            },
            {
                method: "GET",
                endpoint: "/vweb/vweb.js",
                content_type: "application/javascript",
                path: `${__dirname}/../../include/vweb/ui/js/vweb.js`,
            },
        ]
        defaults.iterate((item) => {
            this.endpoint(new Endpoint({
                method: item.method,
                endpoint: item.endpoint,
                data: libfs.readFileSync(item.path/*, 'utf8'*/),
                content_type: item.content_type,
            }))
        })
    }
};

// ---------------------------------------------------------
// Exports.

module.exports = Server;
