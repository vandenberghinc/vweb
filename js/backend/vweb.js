/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Exports.

// Create vweb lib.
const vweb = {
    Meta: require("./meta.js"),
    View: require("./view.js"),
    Endpoint: require("./endpoint.js"),
    Server: require("./server.js"),
    Status: require("./status.js"),
    version: "1.0.9",
}

// Export.
module.exports = vweb;