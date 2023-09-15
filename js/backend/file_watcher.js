/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Libraries.

const libfs = require("fs");
const libpath = require("path");
const libproc = require("child_process");

// ---------------------------------------------------------
// Imports.

const View = require(`${__dirname}/view.js`);

// ---------------------------------------------------------
// Endpoint.

/*  @docs: {
    @title: FileWatcher
    @description: 
        Used to watch all included files and restart the server when any changes have been made.

        Automatically starts when the object is constructed.
    @parameter: {
        @name: source
        @description: The path to the source directory to watch.
        @type: string
    }
    @parameter: {
        @name: target
        @description: The sub path relative to the source to the target file which will start the server.
        @type: string
    }
    @parameter: {
        @name: interval
        @description: The interval in milliseconds between file change checks.
        @type: number
    }
 } */
class FileWatcher {
    constructor({
        source = null,
        target = "start.js",
        interval = 500,
    }) {

        // Arguments.
        this.source = source;
        this.target = target;
        this.interval = interval;

        // Attributes.
        this.mtimes = {};

        // Scan initial files.
        this.scan_files(this.source, true);
        
        // Spawn process.
        this.spawn_process();

        // Start scan loop.
        this.scan();
    }

    // Scan.
    scan() {
        this.scan_files(this.source)
        if (this.has_changed) {
            this.spawn_process();
        }
        setTimeout(() => this.scan(), this.delay);
    }

    // Scan files.
    scan_files(dir, initial = false) {
        libfs.readdirSync(dir).iterate((name) => {
            const path = libpath.join(dir, name);
            const stat = libfs.statSync(path);
            this.mtimes[path] = stat.mtimeMs;
            if (this.mtimes[path] != stat.mtimeMs) {
                this.has_changed = true;
            }
            if (stat.isDirectory()) {
                this.scan_files(path, initial)
            }
        });
    }

    // Spawn process.
    spawn_process() {
        this.has_changed = false;
        if (this.proc != null) {
            this.proc.kill();
        }
        this.proc = libproc.spawn({
            command,
            args,
            {stdio: "inherit"},
        })
        this.proc.on("close", () => {
            this.proc = null;
        })
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = Endpoint;
