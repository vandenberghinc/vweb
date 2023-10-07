/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Exports.

// Create vweb lib.
const vweb = {
    Meta: require(`${__dirname}/meta.js`),
    View: require(`${__dirname}/view.js`),
    Endpoint: require(`${__dirname}/endpoint.js`),
    Server: require(`${__dirname}/server.js`),
    version: "1.0.9",
}

// Export.
module.exports = vweb;