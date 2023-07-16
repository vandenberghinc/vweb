/*
 Author: Daan van den Bergh
 Copyright: © 2022 Daan van den Bergh.
*/

// Header.
#ifndef VWEB_SERVER_CONFIG_H
#define VWEB_SERVER_CONFIG_H


// Namespace vweb.
namespace vweb {

// Namespace server.
namespace server {

// ---------------------------------------------------------
// Server.

/*  @docs {
 *  @chapter: server
 *  @title: Config
 *  @description:
 *      Website server config.
 } */
struct Config {
	String  ip;                 		// webserver ip.
	Int     port = -1;          		// webserver port.
	Path  	cert;               		// path to the certificate.
	Path  	key;                		// path to the certificate key.
	String  pass;               		// the password of the certificate.
	Path  	ca_bundle;          		// path to the ca bundle (optional).
	Path    source;	            		// path to root directory (automatically assigned).
	Path    statics;            		// path to static directory.
	Path    database;           		// path to database.
	Bool    enable_2fa = true;  		// 2FA required after sign up to activate account and after sign in.
	Int     keep_alive = 5;     		// keep alive for idle connections in seconds.
	Int     max_connections = 10000;	// max simultaneous connections.
	Int     max_threads = 25;   		// max serve clients threads.
	Int     log_level = 1;      		// log level [0...2].
	String  domain_name;        		// domain name, e.g. "VInc".
	String  domain;             		// domain url, e.g. "vandenberghinc.com".
	vlib::smtp::Client::ConstructArgs smtp; // the smtp client args.
	
	// Load from file path.
	/*  @docs {
	 *  @chapter: server
	 *  @title: Load Config
	 *  @description:
	 *      Load the server configuration from a json file.
	 *
	 *      <bullet> The `domain` value should NOT be preceded with `http://` or `https://`.
	 *      <bullet> The json may end with a , after the last value.
	 *      <bullet> The json may contain comments before the keys, but not after the last value.
	 *      <bullet> The string $BASE will be replaced in file paths with the base path of parameter "path".
	 *  	```
	 *      {
	 *
	 *			// Server configuration.
	 *          "server": {
	 *              "ip": "*",                              // the ip, leave "*" to run on the generic ip.
	 *              "port": 443,                            // the port to run on, define -1 to run both on http and https.
	 *              "static": "$BASE/static",               // the path to the static files directory.
	 *              "database": "$BASE/.db",                // the path to the database directory.
	 *              "enable_2fa": true,                     // enable 2fa using email.
	 *              "keep_alive": 5,                        // keep alive for idle connections in seconds.
	 *              "max_connections": 10000,               // max simultaneous connections.
	 *              "max_threads": 25,                      // max worker threads.
	 *              "log_level": 1,                         // -1..5
	 *          },
	 *
	 *			// Domain configuration.
	 *          "domain": {
	 *              "name": "My Company",                   // the name of the website.
	 *              "domain": "mycompany.com",              // the domain url without http:// or https://.
	 *          },
	 *
	 *			// TLS configuration.
	 *          "tls": {
	 *              "cert": "$BASE/.tls/ca.crt",            // the path to the tls certificate.
	 *              "key": "$BASE/.tls/ca.key",             // the path to the tls private key.
	 *              "pass": "",                             // the password of the private key, use "" when the key has no
	 *				"ca_bundle": "$BASE/.tls/ca.bundle",    // the path to the ca bundle (optional).
	 *				"state": "Utrecht",                     // only required for generating a CSR.
	 *				"locality": "Utrecht",                  // only required for generating a CSR.
	 *				"organization": "My Company",           // only required for generating a CSR.
	 *				"organization_unit": "IT",              // only required for generating a CSR.
	 *				"common_name": "mycompany.com",         // only required for generating a CSR.
	 *          },
	 *
	 *			// SMTP configuration.
	 *          "smtp": {
	 *              "host": "smtp.domain.com",              // the smtp hostname.
	 *              "port": 465,                            // the smtp port.
	 *              "email": "my@email.com",                // the smtp authentication email.
	 *              "password": "mypass",                   // the smtp authentication password.
	 *              "timeout": 5 * 1000,                    // the smtp timeout in milliseconds.
	 *          },
	 *
	 *			// Service daemon.
	 *          "service": {
	 *          	"name": "mycompany.com",                // the name of the service daemon.
	 *          	"description": "mycompany.com",         // the description of the service daemon.
	 *          	"arguments": [],                        // the start arguments for start.cpp.
	 *          },
	 *
	 *			// Build configuration.
	 *			//  - Required for "$ vweb --start".
	 *			//  - Every value in the build json can be a direct value for all ...
	 *			//    operating systems, or another json with os specific values.
	 *			//    Currently only operating systems "linux" and "macos" are supported.
	 *			"build": {
	 *				"compiler": "g++",
	 *				"std": "c++2b",
	 *				"include_paths": ["/opt/vinc/include/", "/opt/homebrew/opt/openssl@3.1/include/"],
	 *				"library_paths": ["/opt/homebrew/opt/openssl@3.1/lib/"],
	 *				"linked_libraries": {
	 *					"macos": ["-lssl", "-lcrypto", "-lz"],
	 *					"linux": ["-lssl", "-lcrypto", "-lz", "-lcrypt", "-ldl"],
	 *				},
	 *				"other_flags": ["-O2", "-g", "-rdynamic"],
	 *			},
	 *
	 *      }
	 *		```
	 *	@usage:
	 *		vweb::server::Config config = vweb::server::Config::load("/path/to/config");
	 } */
	static
	Config load(const Path& path) {
		Path base = path.base().abs();
		Json json = Json {
			{"server", Json {
				{"ip", "*"},
				{"port", -1},
				{"static", ""},
				{"database", ""},
				{"enable_2fa", true},
				{"keep_alive", 5},
				{"max_connections", 10000},
				{"max_threads", 25},
				{"log_level", 1},
			}},
			{"domain", Json {
				{"name", ""},
				{"domain", ""},
			}},
			{"tls", Json {
				{"cert", ""},
				{"key", ""},
				{"pass", ""},
				{"ca_bundle", ""},
			}},
			{"smtp", Json {
				{"host", ""},
				{"port", 465},
				{"email", ""},
				{"password", ""},
				{"domain", ""},
				{"dkim", ""},
				{"timeout", 5 * 1000},
				{"debug", false},
			}},
		};
		json.concat_r(Json::load(path));
		Json& server = json["server"].asj();
		Json& domain = json["domain"].asj();
		Json& tls = json["tls"].asj();
		Json& smtp = json["smtp"].asj();
		return {
			.ip = server["ip"].ass(),
			.port = server["port"].asi(),
			.cert = tls["cert"].ass().replace_r("$BASE", base),
			.key = tls["key"].ass().replace_r("$BASE", base),
			.pass = tls["pass"].ass(),
			.ca_bundle = tls["ca_bundle"].ass().replace_r("$BASE", base),
			.source = base,
			.statics = server["static"].ass().replace_r("$BASE", base),
			.database = server["database"].ass().replace_r("$BASE", base),
			.enable_2fa = server["enable_2fa"].asb(),
			.keep_alive = server["keep_alive"].asi(),
			.max_connections = server["max_connections"].asi(),
			.max_threads = server["max_threads"].asi(),
			.log_level = server["log_level"].asi(),
			.domain_name = domain["name"].ass(),
			.domain = domain["domain"].ass().replace_r("https://", "").replace_r("http://", ""),
			.smtp = {
				.host = smtp["host"].ass(),
				.port = smtp["port"].asi(),
				.email = smtp["email"].ass(),
				.pass = smtp["password"].ass(),
				.domain = smtp["domain"].ass(),
				.dkim = smtp["dkim"].ass().replace_r("$BASE", base),
				.timeout = smtp["timeout"].asi(),
				.debug = smtp["debug"].asb(),
			}
		};
	}
};

// ---------------------------------------------------------
// End.

};         // End namespace server.
};         // End namespace vweb.
#endif     // End header.

