/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Exports.

// Create vweb lib.
const {FrontendError} = require("./utils.js")
const vweb = {
    FrontendError,
    Meta: require("./meta.js"),
    View: require("./view.js"),
    Endpoint: require("./endpoint.js"),
    Server: require("./server.js"),
    Status: require("./status.js"),
    FileWatcher: require("./file_watcher.js"),
    Mail: require("./plugins/mail.js"),
    PDF: require("./plugins/PDF.js"),
    version: require("../.version.js"),
}

// Export.
module.exports = vweb;