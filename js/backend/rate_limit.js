/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Imports.

const {vlib} = require("./vinc.js");
const utils = require("./utils.js");
const logger = require("./logger.js");

// ---------------------------------------------------------
// Rate limit groups.

/*  @docs:
    @nav: Backend
    @chapter: Rate Limit
    @title: Rate Limit Groups
    @desc:
    	The rate limit groups for the endpoint.

    	A group can either be registered through this class or by defining the rate limit group on an endpoint using `Endpoint.rate_limit`.

    	This class will be accessable under `Server` attribute `rate_limits`.
 */
const RateLimits = {
	groups: new Map(),

	/*  @docs:
	    @title: Add group
	    @desc:
	    	Add a rate limit group.
	    @param:
            @name: group
            @description: The rate limit group.
            @type: string
            @default: "global"
        @param:
            @name: limit
            @description: The maximum requests per rate limit interval. These settings will be cached per group and only have to be assigned once. The assigned attributes will be overridden when these attributes are reassigned for the same group.
            @type: number
            @default: 50
        @param:
            @name: interval
            @description: The rate limit interval in seconds. These settings will be cached per group and only have to be assigned once. The assigned attributes will be overridden when these attributes are reassigned for the same group.
            @type: number
            @default: 60
	 */
	add({
		group = null,
		limit = null,
		interval = null,
	}) {
        const settings = this.groups.has(group) ? this.groups.get(group) : {};
        settings.group = group;
        if (limit) {
            settings.limit = limit;
        } else if (!settings.limit) {
        	settings.limit = 50;
        }
        if (interval) {
            settings.interval = interval;
        } else if (!settings.interval) {
        	settings.interval = 60;
        }
        this.groups.set(group, settings)
        return settings;
	}
}

// ---------------------------------------------------------
// Server.

/*  @docs:
    @nav: Backend
    @chapter: Rate Limit
    @title: Rate Limit Server
    @desc: 
        The rate limit websocket class (server).

        Rate limiting is handled automatically when the endpoints has it enabled.
    @param:
        @name: ip
        @desc: The rate limit server ip. By default localhost will be used.
        @type: null, string
    @param:
        @name: port
        @desc: The rate limit server port. The default port is `51234`.
        @def: 51234
        @type: number
    @param:
        @name: https
        @desc: To enable https on the server you must define a `https.createServer` configuration. Otherwise, the rate limit server will run on http.
        @type: boolean
    @param:
        @name: _server
        @ignore: true
 */
class RateLimitServer {

	// Static attributes.
	static default_port = 51234;

	// Constructor.
	constructor({
		port = RateLimitServer.default_port,
		ip = null,
		https = null,
		_server,
	} = {}) {

		// Checks.
		vlib.scheme.verify({object: arguments[0], check_unknown: true, scheme: {
            port: {type: "number", default: RateLimitServer.default_port},
            ip: {type: "string", default: null},
            https: {type: "https", default: null},
            _server: "object",
        }});

		// Arguments.
		this.ip = ip;
		this.port = port;
		this.https_config = https;
		this.server = _server;

		// Attributes.
		this.limits = new Map();
	}

	// Start.
	async start() {

		// Load/generate api key.
		const data = await this.server._sys_db.load("rate_limit", {
            default: {
                api_key: null,
            }
        });
        if (data.api_key == null) {
        	data.api_key = String.random(32);
        	await this.server._sys_db.save("rate_limit", data);
        }

        // Initialize server.
        this.ws = new vlib.websocket.Server({
        	ip: this.ip,
        	port: this.port,
        	https: this.https_config,
        	api_keys: [data.api_key],
        	rate_limit: {
	    		limit: 100,
	    		interval: 60,
	    	},
		})

		// Listen event.
		this.ws.on_event("listen", (address) => {
			logger.log(0, `RateLimitServer: Running on ${address}.`);
		})

		// Error event.
        this.ws.on_event('error', (stream, e) => {
        	logger.error(`RateLimitServer: ${e}.`);
        });

        // Create limit command.
		this.ws.on("limit", async (stream, id, data) => {
			try {
				this.ws.send({stream, id, data: await this.limit(data.ip, data.groups)});
			} catch (e) {
				logger.error("RateLimitServer:", e);
			}
		})

        // Start.
		await this.ws.start();

        // Clear caches once every 1h.
        const clear_caches = () => {
        	const remove_after = Date.now() + (3600 * 1000);
        	for (const [group, map] of this.limits.entries()) {
        		for (const [ip, data] of map.entries()) {
        			if (remove_after > data.expiration) {
        				map.delete(ip);
        			}
        		}
        	}
        	setTimeout(clear_caches, 3600 * 1 * 1000)
        }
        setTimeout(clear_caches, 3600 * 1 * 1000)
	}

	// Stop.
	async stop() {
		if (this.ws) {
			await this.ws.stop();
			this.ws = undefined;
		}
	}

	// Needs to be async to keep same as client func.
	// Returns null when rate limit is approved, and returns the unix timestamp (as str) of reset when rate limit has been exceeded.
	async limit(ip, groups = [{group:null, limit:null, interval:null}]) {
		return groups.iterate((rate_limit) => {
			for (let attempts = 2; attempts >= 0; --attempts) { // use attempts in case any error arises because of a clear_caches operation.
				try {

					// Get endpoint limits.
					let limits;
					if (this.limits.has(rate_limit.group)) {
						limits = this.limits.get(rate_limit.group);
					} else {
						limits = new Map();
						this.limits.set(rate_limit.group, limits);
					}

					// Limit.
					const now = Date.now();
					if (limits.has(ip)) {
						let data = limits.get(ip);
						if (now >= data.expiration) {
							data = {
								count: 0,
								expiration: now + rate_limit.interval * 1000,
							};
						}
						++data.count;
						if (data.count > rate_limit.limit) {
							return data.expiration;
						}
						limits.set(ip, data);
					} else {
						limits.set(ip, {
							count: 1,
							expiration: now + rate_limit.interval * 1000,
						});
					}
					break;
				} catch (e) {
					if (attempts === 0) {
						throw e;
					}
				}
			}
		});
	}

}

// ---------------------------------------------------------
// Client.

/*  @docs:
    @nav: Backend
    @chapter: Rate Limit
    @title: Rate Limit Client
    @desc: 
        The secondary rate limit class (client).

        Rate limiting is handled automatically when the endpoints has it enabled.
    @param:
        @name: ip
        @desc: The rate limit server ip. By default localhost will be used.
        @type: null, string
    @param:
        @name: port
        @desc: The rate limit server port. The default port is `51234`.
        @def: 51234
        @type: number
    @param:
        @name: https
        @desc: A boolean indicating if the rate limit server has https enabled.
        @type: boolean
	@param:
        @name: url
        @desc: The websocket url of the server. If defined this takes precedence over parameters `ip` and `port`.
        @type: null, string
    @param:
        @name: _server
        @ignore: true
 */
class RateLimitClient {
    constructor({
    	ip = null,
    	port = RateLimitServer.default_port,
    	https = false,
    	url = null,
		_server,
	} = {}) {

		// Checks.
		vlib.scheme.verify({object: arguments[0], check_unknown: true, scheme: {
            ip: {type: "string", default: null},
            port: {type: "number", default: RateLimitServer.default_port},
            https: {type: "object", default: null},
            url: {type: "string", default: null},
            _server: "object",
        }});

		// Arguments.
		this.ip = ip ? ip : "localhost";
		this.port = port;
		this.https = https;
		this.url = url;
		this.server = _server;
    }

    // Start.
    async start() {

    	// Create websocket.
		const data = await this.server._sys_db.load("rate_limit", {
            default: {
                api_key: null,
            }
        });
        if (data.api_key == null) {
        	throw new Error("No rate limit api key has been generated yet.");
        }

        // Initialize server.
        this.ws = new vlib.websocket.Client({
        	url: this.url ? this.url : `${this.https ? "wss" : "ws"}://${this.ip}:${this.port}`,
        	api_key: data.api_key,
        	reconnect: {
	    		interval: 10,
	    		max_interval: 30000,
	    	},
	    	ping: true,
		})

		// Error event.
        this.ws.on_event('error', (e) => {
        	logger.error(`RateLimitClient: ${e}.`);
        });

        // Reconnect event.
        this.ws.on_event('reconnect', (e) => {
        	logger.log(0, 'RateLimitClient: Attempting to reconnect with the server.');
        });

        // Close event.
        this.ws.on_event('close', () => {
        	logger.log(0, 'RateLimitClient: Websocket closed after exhausting all reconnect attempts.');
        	process.exit(1); // stop the thread.
        });

        // Connect.
		await this.ws.connect();
    }

    // Stop.
	async stop() {
		if (this.ws) {
			await this.ws.disconnect();
			this.ws = undefined;
		}
	}

    // Limit function.
    // Returns null when rate limit is approved, and returns the unix timestamp (as str) of reset when rate limit has been exceeded.
    async limit(ip, groups = [{group:null, limit:null, interval:null}]) {
    	const {data} = await this.ws.request({command: "limit", timeout: 10000, data: {ip, groups}});
    	return data;
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = {RateLimits, RateLimitServer, RateLimitClient};
