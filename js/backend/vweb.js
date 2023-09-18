/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Exports.

// Extend default prototypes.
require(`${__dirname}/array.js`)

// Create vweb lib.
const vweb = {
    Meta: require(`${__dirname}/meta.js`),
    View: require(`${__dirname}/view.js`),
    Endpoint: require(`${__dirname}/endpoint.js`),
    Server: require(`${__dirname}/server.js`),
}

// Export.
module.exports = vweb;