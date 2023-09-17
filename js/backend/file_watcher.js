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
// Endpoint.

/*  @docs: {
    @title: FileWatcher
    @description: 
        Used to watch all included files and restart the server when any changes have been made.
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
        @name: args
        @description: The additional start arguments.
        @type: array[string]
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
        args = [],
        interval = 500,
    }) {

        // Arguments.
        this.source = source;
        this.target = target;
        this.args = [target, ...args];
        this.interval = interval;

        // Check source.
        if (source == null) {
            throw Error("Define argument: source.");
        }

        // Attributes.
        this.mtimes = {};
    }

    // Start.
    start() {

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
            if (this.mtimes[path] != stat.mtimeMs) {
                this.has_changed = true;
            }
            this.mtimes[path] = stat.mtimeMs;
            if (stat.isDirectory()) {
                this.scan_files(path, initial)
            }
        });
    }

    // Spawn process.
    spawn_process(forced = false) {
        this.has_changed = false;
        if (!forced && this.proc != null) {
            console.log("Restarting server due to file changes."); // @warning if you change this running on text you should update vide::BuildSystem since that depends on this log line.
            this.proc.kill("SIGINT");
        } else {
            this.proc = libproc.spawn(
                "node",
                this.args,
                {
                    cwd: this.source,
                    stdio: "inherit",
                    env: {
                         ...process.env,
                        "VWEB_FILE_WATCHER": "1",
                    },
                },
            )
            this.proc.on("close", (code, signal) => {
                if (code == 0) {
                    this.spawn_process(true);
                } else {
                    process.exit(code);
                }
            })
            this.proc.on("error", () => {
                process.exit(1);
            })
        }
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = FileWatcher;
