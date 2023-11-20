/*
 * Author: Daan van den Bergh
 * Copyright: © 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Bundle library.

// Import.
const libfs = require("fs");
let vhighlight;
if (libfs.existsSync("/Volumes/persistance")) {
    vhighlight = require("/Volumes/persistance/private/vinc/vhighlight/vhighlight.js");
    require("/Volumes/persistance/private/vinc/vlib/js/vlib.js");
} else {
    vhighlight = require("/Users/administrator/persistance/private/vinc/vhighlight/vhighlight.js");
    require("/Users/administrator/persistance/private/vinc/vlib/js/vlib.js");
}

// Source file.
const frontend =  `${__dirname}/../js/frontend/`;

// Initialize compiler.
const compiler = new vhighlight.JSCompiler();

// Seperate modules not to be joined into the vweb bundle.
const seperate_modules = [
    "adyen.js",
    "paddle.js",
    "compression.js",
]

// Bundle vweb.
compiler.bundle({
    export_path: `${frontend}/min/vweb.js`,
    includes: [
        `${frontend}/modules/vweb.js`,
        `${frontend}/modules/utils.js`,
        `${frontend}/modules/elements.js`,
        `${frontend}/modules/google.js`,
        `${frontend}/modules/cookies.js`,
        `${frontend}/ui/mutex.js`,
        `${frontend}/ui/element.js`,
        `${frontend}/ui/vstack.js`,
        `${frontend}/ui/hstack.js`,
        `${frontend}/modules`,
        `${frontend}/libs`,
        `${frontend}/ui`,
    ],
    excludes: seperate_modules.iterate_append((name) => `${frontend}/modules/${name}`),
    log: true,
});

// Bundle seperate modules.
if (process.argv.includes("--vweb") === false) {
    seperate_modules.iterate((name) => {
        if (name === "compression.js") {return null;}
        compiler.bundle({
            export_path: `${frontend}/min/${name}`,
            includes: [`${frontend}/modules/${name}`],
            log: true,
        })
    })
}


// Log.
// console.log(`Bundled into "${export_path}".`);