/*
 * Author: Daan van den Bergh
 * Copyright: © 2022 - 2023 Daan van den Bergh.
 */

// ---------------------------------------------------------
// Libraries.

const libfs = require("fs");
const libpath = require("path");
const libproc = require("child_process");
const {vlib} = require("./vinc.js");

// ---------------------------------------------------------
// Endpoint.

/*  @docs:
 *  @chapter: Backend
    @title: FileWatcher
    @description: 
        Used to watch all included files and restart the server when any changes have been made.
    @parameter:
        @name: source
        @description: The path to the source directory to watch.
        @type: string
    @parameter:
        @name: target
        @description: The sub path relative to the source to the target file which will start the server.
        @type: string
    @parameter:
        @name: args
        @description: The additional start arguments.
        @type: array[string]
    @parameter:
        @name: interval
        @description: The interval in milliseconds between file change checks.
        @type: number
 */
class FileWatcher {
    constructor({
        source = null,
        target = "start.js",
        args = [],
        interval = 750,
        excluded = [],
        additional_paths = [],

    }) {

        // Arguments.
        this.source = source;
        this.target = target;
        this.args = [target, ...args];
        this.interval = interval;
        this.excluded = excluded;

        // Check source.
        if (this.source instanceof vlib.Path) {
            this.source = this.source.str();
        }
        if (this.source == null) {
            throw Error("Define argument: source.");
        }

        // Attributes.
        this.additional_paths = additional_paths;
        this.mtimes = {};
        this.promise = new Promise(() => {});
    }

    // Start.
    start() {

        // Drop all additional files that are part of the source directory.
        // let additional_paths = [];
        // this.additional_paths.iterate((path) => {
        //     if (path.eq_first(this.source) === false) {
        //         additional_paths.push(path);
        //     }
        // })
        // this.additional_paths = additional_paths;

        // Scan initial files.
        this.scan_files();

        process.on('SIGTERM', () => {
            this.proc.kill("SIGTERM");
            process.exit(0)
        });
        process.on('SIGINT', () => {
            this.proc.kill("SIGINT");
            process.exit(0)
        });
        
        // Spawn process.
        this.scan_files();
        this.has_changed = false;
        this.spawn_process();
        this.args.push("--file-watcher-restart")

        // Start scan loop.
        this.scan();
    }

    // Scan.
    scan() {
        this.scan_files()
        if (this.has_changed) {
            this.restart_process();
        }
        setTimeout(() => this.scan(), this.interval);
    }

    // Scan files.
    scan_files() {
        const scan_files = (dir) => {
            libfs.readdirSync(dir).iterate((name) => scan_file(libpath.join(dir, name)));    
        }
        const scan_file = (path) => {
            if (this.excluded.includes(path)) {
                return null;
            }
            const stat = libfs.statSync(path);
            if (this.mtimes[path] != stat.mtimeMs) {
                this.has_changed = true;
            }
            this.mtimes[path] = stat.mtimeMs;
            if (stat.isDirectory()) {
                scan_files(path)
            }
        }
        scan_files(this.source);
        this.additional_paths.iterate((path) => scan_file(path));
    }

    // Spawn process.
    spawn_process() {
        this.proc = libproc.spawn(
            "node",
            this.args,
            {
                cwd: this.source,
                stdio: "inherit",
                detached: true,
                env: {
                     ...process.env,
                    "VWEB_FILE_WATCHER": "1",
                },
            },
        )
        this.proc.on("exit", (code, signal) => {
            if (code == 0) {
                this.spawn_process();
            } else {
                process.exit(code);
            }
        })
        this.proc.on("error", () => {
            process.exit(1);
        })
    }

    // Spawn process.
    async restart_process() {
        console.log(`${new vlib.Date().format("%d-%m-%y %H:%M:%S")} - Restarting server due to file changes.`); // @warning if you change this running on text you should update vide::BuildSystem since that depends on this log line.
        this.has_changed = false;
        this.proc.kill("SIGINT");
    }
}

// ---------------------------------------------------------
// Exports.

module.exports = FileWatcher;
