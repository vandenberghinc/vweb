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
    Mail: require("./mail.js"),
    FileWatcher: require("./file_watcher.js"),
    version: require("../.version.js"),
}

// Export.
module.exports = vweb;