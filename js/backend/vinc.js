/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Libraries.

// const vlib = require("@vandenberghinc/vlib")
// const vhighlight = require("@vandenberghinc/vhighlight")

let vlib, vhighlight;
if (require("fs").existsSync("/Volumes/persistance/")) {
    vlib = require("/Volumes/persistance/private/vinc/vlib/js/vlib.js")
    vhighlight = require("/Volumes/persistance/private/vinc/vhighlight/vhighlight.js")    
} else {
    vlib = require("/Users/administrator/persistance/private/vinc/vlib/js/vlib.js")
    vhighlight = require("/Users/administrator/persistance/private/vinc/vhighlight/vhighlight.js")
}

// ---------------------------------------------------------
// Exports.

module.exports = {vlib, vhighlight}