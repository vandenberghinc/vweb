/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Imports.

const {Server, Endpoint, View, Meta} = require(`${__dirname}/../js/backend/vweb.js`);

// ---------------------------------------------------------
// Server.

// Initialize the server.
const server = new Server({
	port: 8000,
	ip: "127.0.0.1",
	private_key: `${__dirname}/../dev/tls/private-key.pem`,
	certificate: `${__dirname}/../dev/tls/certificate.pem`,
	passphrase: "Doeman12!",
	statics: [
		`${__dirname}/media/`,
		`${__dirname}/ui/`,
	],
	file_watcher: __dirname,
})

// Create meta data.
const meta = new Meta({
	author: "Daan van den Bergh",
    title: "Demo JS",
    description: "Demo js page.",
    image: null,
    robots: "index, follow",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    favicon: "/favicon.ico",
});

// Create endpoints.
server.endpoint({
	method: "GET",
    endpoint: "/",
    meta: meta,
    view: {
    	includes: ["/ui/my_element.js"],
    	callback: () => {
    		vweb.utils.on_load(() => {
    			return View(
    				MyElement("Hello World! How are you? Howdy"),
    			);
    		})
    	}
    },
})

// Start the server.
server.start();